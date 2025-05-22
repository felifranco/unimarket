import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatMessage, chatUser } from "../../interfaces/chat.interfaces";
import { PURGE } from "redux-persist";

const initialState = {
  isConnected: false,
  messages: [] as chatMessage[],
  users: [] as chatUser[],
  selectedUser: null as chatUser | null,
  loading: false,
  error: null,
};

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
      const existingMessage = state.messages.find(
        message => message.id === newMessage.id,
      );
      if (!existingMessage) {
        state.messages.push(newMessage);
      } else {
        const index = state.messages.indexOf(existingMessage);
        state.messages[index] = newMessage;
      }
    },
    removeMessage: (state, action: PayloadAction<number>) => {
      const messageId = action.payload;
      const index = state.messages.findIndex(
        message => message.id === messageId,
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
    builder.addCase(PURGE, () => initialState);
  },
});

export const {
  setConnected,
  setMessages,
  setUsers,
  setSelectedUser,
  clearMessages,
  clearUsers,
  clearSelectedUser,
  addUser,
  removeUser,
} = chatSlice.actions;
export default chatSlice.reducer;
