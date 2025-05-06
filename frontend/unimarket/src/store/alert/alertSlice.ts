import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface alertInterface {
  type?: "success" | "warning" | "danger" | "info";
  message: string;
  showMessage?: boolean;
}

const initialState: alertInterface = {
  type: "info",
  message: "",
  showMessage: false,
};

export const alertSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<alertInterface>) => {
      state.type = action.payload.type ? action.payload.type : "info";
      state.message = action.payload.message;
      state.showMessage = true;
    },
    cleanMessage: () => {
      return initialState;
    },
  },
});

export const { setMessage, cleanMessage } = alertSlice.actions;

export default alertSlice.reducer;
