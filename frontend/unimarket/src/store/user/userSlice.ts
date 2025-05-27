import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { service } from "../../config/configurations";
import { get, patch } from "../../utils/axios.util";
import { ApiResponse } from "../../utils/apiResponse.util";
import { userInterface } from "../../interfaces/users.interface";
import { createConversation } from "../chat/chatSlice";
import { conversacionBase } from "../../interfaces/chat.interfaces";
import { PURGE } from "redux-persist";

const USER_SERVICE = service.USER_SERVICE;
const endpoint = "users";

const emptyUser: userInterface = {
  id_usuario: 0,
  uuid: "",
  username: "",
  nombre_completo: "",
  estrellas: 0,
  calificacion: 0,
  ubicacion: "",
  correo: "",
  telefono: "",
  imagen_portada: "",
  imagen_perfil: "",
  acerca_de: "",
};

interface UserState {
  users: Array<userInterface> | [];
  user: userInterface;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  user: emptyUser,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get(`${USER_SERVICE}/${endpoint}`);
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async ({ id_usuario }: { id_usuario: number }, { rejectWithValue }) => {
    try {
      const response = await get(`${USER_SERVICE}/${endpoint}/${id_usuario}`);
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const fetchUserByIdForChat = createAsyncThunk(
  "users/fetchUserByIdForChat",
  async (
    { id_usuario }: { id_usuario: number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = (await get(
        `${USER_SERVICE}/${endpoint}/${id_usuario}`,
      )) as ApiResponse<userInterface>;

      console.log("response", response);
      if (response.data) {
        const user: userInterface = response.data;
        console.log("user", user);
        if (user && user.uuid && user.imagen_perfil && user.nombre_completo) {
          const conversationData: conversacionBase = {
            destinatario: user.uuid,
            imagen_perfil_destinatario: user.imagen_perfil,
            nombre_destinatario: user.nombre_completo,
          };
          console.log("conversationData", conversationData);
          // Dispatch action to create a conversation
          dispatch(createConversation(conversationData));
        }
      }

      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const patchUser = createAsyncThunk(
  "users/patchUser",
  async (
    { id_usuario, data }: { id_usuario: number; data: Partial<userInterface> },
    { rejectWithValue },
  ) => {
    try {
      const response = await patch(
        `${USER_SERVICE}/${endpoint}/${id_usuario}`,
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      //FETCH USERS
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<userInterface[]>;
          state.users = response.data || [];
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      // FETCH USER BY ID
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<userInterface>;
          state.user = response.data || emptyUser;
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(fetchUserById.pending, state => {
        state.loading = true;
        state.user = emptyUser;
      })
      // PATCH USER
      .addCase(
        patchUser.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<userInterface>;
          state.user = response.data || emptyUser;
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(patchUser.pending, state => {
        state.loading = true;
      });

    builder.addCase(PURGE, () => initialState);
  },
});

export default userSlice.reducer;
