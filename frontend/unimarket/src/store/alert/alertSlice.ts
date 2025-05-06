import { createSlice, PayloadAction, isAnyOf } from "@reduxjs/toolkit";
import { login, register, me } from "../auth/authSlice";
import { getHttpErrorMessage } from "../../utils/errorApiResponse.util";
import { PURGE } from "redux-persist";

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
  extraReducers: builder => {
    //LOGOUT
    builder.addCase(PURGE, state => {
      state.showMessage = true;
      state.type = "success";
      state.message = "come_back_soon";
    });

    // LOGIN - REGISTER - ME
    builder
      .addMatcher(isAnyOf(login.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        if (action.payload && action.payload.status) {
          state.message = getHttpErrorMessage(action.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(register.fulfilled), state => {
        state.showMessage = true;
        state.type = "success";
        state.message = "successfully_registered";
      })
      .addMatcher(isAnyOf(register.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        if (action.payload && action.payload.status) {
          state.message = getHttpErrorMessage(action.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })

      .addMatcher(isAnyOf(me.fulfilled), state => {
        state.showMessage = true;
        state.type = "success";
        state.message = "welcome";
      })
      .addMatcher(isAnyOf(me.rejected), state => {
        state.showMessage = true;
        state.type = "danger";
        state.message = "oops_problem_ocurred";
      });
  },
});

export const { setMessage, cleanMessage } = alertSlice.actions;

export default alertSlice.reducer;
