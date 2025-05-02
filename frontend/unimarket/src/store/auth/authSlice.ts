import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { service } from "../../config/configurations";
import { get, post } from "../../utils/axios.util";
import { ApiResponse } from "../../utils/apiResponse.util";
import { PURGE } from "redux-persist";

const AUTH_SERVICE = service.AUTH_SERVICE;

const endpoint = "auth";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  id_usuario: number;
  correo?: string;
  nombre_completo?: string;
  first_name?: string;
  username?: string;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  id_usuario: 0,
  correo: undefined,
  nombre_completo: undefined,
  first_name: undefined,
  username: undefined,
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

    return response;
  },
);

export const me = createAsyncThunk("me", () => {
  return get(`${AUTH_SERVICE}/${endpoint}/me`);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: builder => {
    //LOGIN
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<ApiResponse<unknown>>) => {
        const response = action.payload as ApiResponse<{
          accessToken: string;
          refreshToken: string;
        }>;
        state.accessToken = response.data?.accessToken || null;
        state.refreshToken = response.data?.refreshToken || null;
        console.log("Login successful:", response.data);
      },
    );
    //.addCase(login.rejected, (state, action) => {
    //  console.error("Login failed:", action, action.error.message);
    //});

    //REGISTER
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<ApiResponse<unknown>>) => {
        console.log("Register successful:", state, action.payload);
      },
    );
    //.addCase(register.rejected, (state, action) => {
    //  console.error("Register failed 1:", action);
    //  console.error("Register failed 2:", action.error.message);
    //});

    //ME
    builder.addCase(
      me.fulfilled,
      (state, action: PayloadAction<ApiResponse<unknown>>) => {
        const response = action.payload as ApiResponse<{
          id_usuario: number;
          correo: string;
          nombre_completo: string;
          username: string;
        }>;
        state.id_usuario = response.data?.id_usuario || 0;
        state.correo = response.data?.correo || undefined;
        state.nombre_completo = response.data?.nombre_completo || undefined;
        state.first_name =
          response.data?.nombre_completo.split(" ")[0] || undefined;
        state.username = response.data?.username || undefined;
        console.log("Me successful:", action.payload);
      },
    );
    //.addCase(me.rejected, (state, action) => {
    //  console.error("Me failed:", action);
    //  console.error("Me failed:", action.error.message);
    //});

    //LOGOUT
    builder.addCase(PURGE, state => {
      state = initialState;
      return state;
    });
  },
});

export const { setToken } = authSlice.actions;

export const selectAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;

export default authSlice.reducer;
