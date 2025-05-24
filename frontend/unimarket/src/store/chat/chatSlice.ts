import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get, post, patch, del } from "../../utils/axios.util";
import { ApiResponse } from "../../utils/apiResponse.util";
import { chatMessage, chatUser } from "../../interfaces/chat.interfaces";
import { PURGE } from "redux-persist";

const MESSAGE_SERVICE = import.meta.env.VITE_MESSAGE_SERVICE;
const conversationEndpoint = "conversation";
const messageEndpoint = "message";

interface ChatState {
  conversations: chatUser[];
  conversation: chatUser | null;
  messages: chatMessage[];
  message: chatMessage | null;
  chatLoading: boolean;
  chatError: string | null;
  // Viejos
  isConnected?: boolean;
  users: chatUser[];
  selectedUser: chatUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  conversation: null,
  messages: [],
  message: null,
  chatLoading: false,
  chatError: null,
  //Viejos
  isConnected: false,
  //messages: [] as chatMessage[],
  users: [] as chatUser[],
  selectedUser: null as chatUser | null,
  loading: false,
  error: null,
};

// --- Async Thunks ---

export const createConversation = createAsyncThunk(
  "chat/createConversation",
  async (data: Partial<chatUser>, { rejectWithValue }) => {
    try {
      const response = await post(
        `${MESSAGE_SERVICE}/${conversationEndpoint}`,
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

export const createMessage = createAsyncThunk(
  "chat/createMessage",
  async (data: Partial<chatMessage>, { rejectWithValue }) => {
    try {
      const response = await post(
        `${MESSAGE_SERVICE}/${messageEndpoint}`,
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

export const patchMessage = createAsyncThunk(
  "chat/patchMessage",
  async (
    { id_mensaje, data }: { id_mensaje: number; data: Partial<chatMessage> },
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
    setMessages: (state, action: PayloadAction<chatMessage[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<chatMessage>) => {
      const newMessage = action.payload;

      state.messages.push(newMessage);
    },
    removeMessage: (state, action: PayloadAction<number>) => {
      const id_mensaje = action.payload;
      const index = state.messages.findIndex(
        message => message.id_mensaje === id_mensaje,
      );
      if (index !== -1) {
        state.messages.splice(index, 1);
      }
    },
    clearMessages: state => {
      state.messages = [];
    },
    clearUsers: state => {
      state.users = [];
    },
    clearSelectedUser: state => {
      state.selectedUser = null;
    },
    addUser: (state, action: PayloadAction<chatUser>) => {
      const newUser = action.payload;
      const existingUser = state.users.find(user => user.uuid === newUser.uuid);
      if (!existingUser) {
        state.users.push(newUser);
      } else {
        const index = state.users.indexOf(existingUser);
        state.users[index] = newUser;
      }
    },
    addSelectedUser: (state, action: PayloadAction<chatUser>) => {
      const newUser = action.payload;
      const existingUser = state.users.find(user => user.uuid === newUser.uuid);
      if (!existingUser) {
        state.users.push(newUser);
      } else {
        const index = state.users.indexOf(existingUser);
        state.users[index] = newUser;
      }
      state.selectedUser = newUser;
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const index = state.users.findIndex(user => user.uuid === userId);
      if (index !== -1) {
        state.users.splice(index, 1);
      }
    },
    setUsers: (state, action: PayloadAction<chatUser[]>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<chatUser | null>) => {
      state.selectedUser = action.payload;
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
          const response = action.payload as ApiResponse<chatUser>;
          state.conversation = response.data || null;
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
          const response = action.payload as ApiResponse<chatUser[]>;
          state.conversations = response.data || [];
          state.chatLoading = false;
          state.chatError = null;
        },
      )
      .addCase(fetchConversationById.pending, state => {
        state.chatLoading = true;
      })
      .addCase(
        fetchConversationById.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<chatUser>;
          state.conversation = response.data || null;
          state.chatLoading = false;
          state.chatError = null;
        },
      )
      .addCase(createMessage.pending, state => {
        state.chatLoading = true;
      })
      .addCase(
        createMessage.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<chatMessage>;
          state.message = response.data || null;
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
          const response = action.payload as ApiResponse<chatMessage>;
          state.message = response.data || null;
          state.chatLoading = false;
          state.chatError = null;
        },
      )
      .addCase(deleteMessage.pending, state => {
        state.chatLoading = true;
      })
      .addCase(deleteMessage.fulfilled, state => {
        state.message = null;
        state.chatLoading = false;
        state.chatError = null;
      })
      .addCase(PURGE, () => initialState);
  },
});

export const {
  setConnected,
  setMessages,
  addMessage,
  removeMessage,
  clearMessages,
  clearUsers,
  clearSelectedUser,
  addUser,
  addSelectedUser,
  removeUser,
  setUsers,
  setSelectedUser,
} = chatSlice.actions;
export default chatSlice.reducer;
