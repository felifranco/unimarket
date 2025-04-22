import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { service } from "../../config/configurations";
import { post } from "../../utils/axios.util";
import { ApiResponse } from "../../utils/apiResponse.util";
import { PURGE } from "redux-persist";

const AUTH_SERVICE = service.AUTH_SERVICE;

const endpoint = "auth";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

export const login = createAsyncThunk(
  "login",
  async (credentials: {
    username: string;
    password: string;
    remember: string;
  }) => {
    const response = await post(`${AUTH_SERVICE}/${endpoint}/login`, {
      correo: credentials.username,
      password: credentials.password,
    });

    //if (response.statusCode !== 200) {
    //  throw new Error(response.message);
    //}
    return response;
  },
);

export const register = createAsyncThunk(
  "register",
  async (user: {
    name: string;
    email: string;
    username: string;
    password: string;
  }) => {
    const response = await post(`${AUTH_SERVICE}/${endpoint}/register`, {
      nombre_completo: user.name,
      correo: user.email,
      username: user.username,
      password: user.password,
    });

    //if (response.statusCode !== 200) {
    //  throw new Error(response.message);
    //}
    return response;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    //LOGIN
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<{
            access_token: string;
          }>;
          state.token = response.data?.access_token || null;
          console.log("Login successful:", action.payload);
        },
      )
      .addCase(login.rejected, (state, action) => {
        console.error("Login failed:", action, action.error.message);
      });

    //REGISTER
    builder
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          console.log("Register successful:", action.payload);
        },
      )
      .addCase(register.rejected, (state, action) => {
        console.error("Register failed 1:", action);
        console.error("Register failed 2:", action.error.message);
      });

    //LOGOUT
    builder.addCase(PURGE, state => {
      //return initialState;
      state.token = null;
    });
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
