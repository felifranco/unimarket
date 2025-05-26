import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get, post, patch, del } from "../../utils/axios.util";
import { ApiResponse } from "../../utils/apiResponse.util";
import {
  socketMessage,
  Conversacion,
  conversacionBase,
  Mensaje,
} from "../../interfaces/chat.interfaces";
import { PURGE } from "redux-persist";
import type { RootState } from "../index";

const MESSAGE_SERVICE = import.meta.env.VITE_MESSAGE_SERVICE;
const conversationEndpoint = "conversation";
const messageEndpoint = "message";

interface ChatState {
  isConnected?: boolean;
  conversaciones: Conversacion[];
  conversacionActiva: Conversacion | null;
  mensajes: Mensaje[];
  mensaje: Mensaje | null;
  chatLoading: boolean;
  chatError: string | null;
}

const initialState: ChatState = {
  isConnected: false,
  conversaciones: [],
  conversacionActiva: null,
  mensajes: [],
  mensaje: null,
  chatLoading: false,
  chatError: null,
};

// --- Async Thunks ---

export const createConversation = createAsyncThunk(
  "chat/createConversation",
  async (
    conversacionInicial: Partial<conversacionBase>,
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as RootState;
      const uuid = state.auth.uuid;
      const nombre_completo = state.auth.nombre_completo;
      const imagen_perfil = state.auth.imagen_perfil;
      const conversaciones = state.chat.conversaciones;

      // No se puede tener una conversación con uno mismo
      if (uuid === conversacionInicial.destinatario) return;

      const existingConversacion = conversaciones.find(
        conversacion =>
          conversacion.destinatario === conversacionInicial.destinatario ||
          conversacion.remitente === conversacionInicial.destinatario,
      );
      if (!existingConversacion) {
        // Si la conversación no existe, creamos una nueva
        console.log("No existe una conversación previa, creando una nueva");
        const response = await post(
          `${MESSAGE_SERVICE}/${conversationEndpoint}`,
          {
            destinatario: conversacionInicial.destinatario,
            imagen_perfil_remitente: imagen_perfil,
            imagen_perfil_destinatario:
              conversacionInicial.imagen_perfil_destinatario,
            nombre_remitente: nombre_completo,
            nombre_destinatario: conversacionInicial.nombre_destinatario,
          },
        );
        return response;
      } else {
        console.log(
          "Ya existe una conversación previa, retornando la existente",
          existingConversacion,
        );
        // Si la conversación ya existe, simplemente la retornamos
        // y no hacemos nada más
        const response: ApiResponse<Conversacion> = {
          data: existingConversacion,
          statusCode: 200,
          message: "Conversación existente",
        };

        return response;
      }
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get(
        `${MESSAGE_SERVICE}/${conversationEndpoint}/mine`,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const fetchConversationById = createAsyncThunk(
  "chat/fetchConversationById",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const response = await get(
        `${MESSAGE_SERVICE}/${conversationEndpoint}/${id}`,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const deleteConversation = createAsyncThunk(
  "chat/deleteConversation",
  async (id_conversacion: number, { rejectWithValue }) => {
    try {
      const response = await del(
        `${MESSAGE_SERVICE}/${conversationEndpoint}/${id_conversacion}`,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const patchMessage = createAsyncThunk(
  "chat/patchMessage",
  async (
    { id_mensaje, data }: { id_mensaje: number; data: Partial<Mensaje> },
    { rejectWithValue },
  ) => {
    try {
      const response = await patch(
        `${MESSAGE_SERVICE}/${messageEndpoint}/${id_mensaje}`,
        data,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const deleteMessage = createAsyncThunk(
  "chat/deleteMessage",
  async (id_mensaje: number, { rejectWithValue }) => {
    try {
      const response = await del(
        `${MESSAGE_SERVICE}/${messageEndpoint}/${id_mensaje}`,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setConversacionActiva: (state, action: PayloadAction<Conversacion>) => {
      state.conversacionActiva = action.payload;
      state.mensajes = action.payload.mensajes || [];
    },
    delConversacionActiva: state => {
      state.conversacionActiva = null;
      state.mensajes = [];
    },
    addMensajeEntrante: (state, action: PayloadAction<socketMessage>) => {
      const conversacionIngresada = action.payload;
      const id_conversacion = conversacionIngresada.id_conversacion;
      if (id_conversacion) {
        // Si la conversación ya existe en la base de datos
        const index = state.conversaciones.findIndex(
          conversacion =>
            conversacion.id_conversacion ===
            conversacionIngresada.id_conversacion,
        );
        const nuevoMensaje: Mensaje = {
          ...conversacionIngresada,
          id_conversacion,
          leido_destinatario: false,
          fecha_envio: new Date().toISOString(),
        };
        const conversacion: Conversacion = {
          ...conversacionIngresada,
          ultimo_mensaje: nuevoMensaje.mensaje,
          fecha_creacion: new Date().toISOString(),
        };
        if (index !== -1) {
          // Si la conversación ya está en mi listado
          state.conversaciones[index] = {
            ...state.conversaciones[index],
            ...conversacion,
            mensajes: [
              ...(state.conversaciones[index].mensajes || []),
              nuevoMensaje,
            ],
          };
          if (
            state.conversacionActiva &&
            state.conversacionActiva.id_conversacion === id_conversacion
          ) {
            // Si la conversación activa es la misma, actualizamos los mensajes
            state.conversacionActiva = state.conversaciones[index];
            state.mensajes.push(nuevoMensaje);
          }
        } else {
          // Si la conversación no está en mi listado, la agregamos
          conversacion.mensajes = [nuevoMensaje];
          state.conversaciones.push(conversacion);
        }
      } else {
        // Si la conversación no existe en la base de datos
      }
    },
    borrarConversacion: (
      state,
      action: PayloadAction<{ remitente?: string; destinatario?: string }>,
    ) => {
      const { remitente, destinatario } = action.payload;
      const index = state.conversaciones.findIndex(
        conversacion =>
          conversacion.remitente === remitente &&
          conversacion.destinatario === destinatario,
      );
      if (index !== -1) {
        state.conversaciones.splice(index, 1);
        if (state.conversacionActiva) {
          state.conversacionActiva = null;
        }
      }
    },
    addMensaje: (state, action: PayloadAction<Mensaje>) => {
      const nuevoMensaje = action.payload;
      nuevoMensaje.leido_remitente = true;
      nuevoMensaje.fecha_envio = new Date().toISOString();
      const conversacionActiva = state.conversacionActiva;
      if (conversacionActiva) {
        const index = state.conversaciones.findIndex(
          conversacion =>
            conversacion.id_conversacion === conversacionActiva.id_conversacion,
        );
        if (index !== -1) {
          state.conversaciones[index].mensajes?.push(nuevoMensaje);
          conversacionActiva.mensajes?.push(nuevoMensaje);
          state.conversacionActiva = conversacionActiva;
          state.mensajes.push(nuevoMensaje);
        }
      }
    },
  },
  extraReducers: builder => {
    // --- Conversations ---
    builder
      .addCase(createConversation.pending, state => {
        state.chatLoading = true;
      })
      .addCase(
        createConversation.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<Conversacion>;
          const conversacion = response.data;
          if (conversacion) {
            state.conversaciones.push(conversacion);
            state.conversacionActiva = conversacion;
            state.mensajes = conversacion.mensajes || [];
          }
          state.chatLoading = false;
          state.chatError = null;
        },
      )
      .addCase(fetchConversations.pending, state => {
        state.chatLoading = true;
      })
      .addCase(
        fetchConversations.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<Conversacion[]>;
          const conversaciones = response.data;
          if (conversaciones) {
            state.conversaciones = conversaciones;
            const idConversacionActiva =
              state.conversacionActiva?.id_conversacion;
            if (idConversacionActiva) {
              const activeConversation = state.conversaciones.find(
                conversacion =>
                  conversacion.id_conversacion === idConversacionActiva,
              );
              if (activeConversation) {
                state.conversacionActiva = activeConversation;
                state.mensajes = activeConversation.mensajes || [];
              }
            }

            state.chatLoading = false;
            state.chatError = null;
          }
        },
      )
      .addCase(fetchConversationById.pending, state => {
        state.chatLoading = true;
      })
      .addCase(
        fetchConversationById.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<Conversacion>;
          const conversacion = response.data || null;
          if (conversacion) {
            state.conversacionActiva = conversacion;
            state.mensajes = conversacion.mensajes ?? [];
            const existingIndex = state.conversaciones.findIndex(
              c => c.id_conversacion === conversacion.id_conversacion,
            );
            if (existingIndex !== -1) {
              state.conversaciones[existingIndex] = conversacion;
            }
          }
          state.chatLoading = false;
          state.chatError = null;
        },
      )
      .addCase(deleteConversation.pending, state => {
        state.chatLoading = true;
      })
      .addCase(
        deleteConversation.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<Conversacion>;
          const conversacion = response.data || null;
          if (conversacion && conversacion.id_conversacion) {
            state.conversaciones = state.conversaciones.filter(
              c => c.id_conversacion !== conversacion.id_conversacion,
            );
            state.conversacionActiva = null;
            state.mensajes = [];
          }
          state.chatLoading = false;
          state.chatError = null;
        },
      )
      .addCase(patchMessage.pending, state => {
        state.chatLoading = true;
      })
      .addCase(
        patchMessage.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<Mensaje>;
          state.mensaje = response.data || null;
          state.chatLoading = false;
          state.chatError = null;
        },
      )
      .addCase(deleteMessage.pending, state => {
        state.chatLoading = true;
      })
      .addCase(deleteMessage.fulfilled, state => {
        state.mensaje = null;
        state.chatLoading = false;
        state.chatError = null;
      })
      .addCase(PURGE, () => initialState);
  },
});

export const {
  setConnected,
  setConversacionActiva,
  delConversacionActiva,
  addMensajeEntrante,
  borrarConversacion,
  addMensaje,
} = chatSlice.actions;
export default chatSlice.reducer;
