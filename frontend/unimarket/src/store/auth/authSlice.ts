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
  logged: boolean;
  registered: boolean;
  id_usuario: number;
  correo?: string;
  nombre_completo?: string;
  imagen_perfil?: string;
  first_name?: string;
  username?: string;
  uuid?: string;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  logged: false,
  registered: false,
  id_usuario: 0,
  correo: undefined,
  nombre_completo: undefined,
  imagen_perfil: undefined,
  first_name: undefined,
  username: undefined,
  uuid: undefined,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string; remember: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await post(`${AUTH_SERVICE}/${endpoint}/login`, {
        correo: credentials.username,
        password: credentials.password,
      });
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    user: {
      name: string;
      email: string;
      username: string;
      password: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await post(`${AUTH_SERVICE}/${endpoint}/register`, {
        nombre_completo: user.name,
        correo: user.email,
        username: user.username,
        password: user.password,
      });
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const me = createAsyncThunk("auth/me", () =>
  get(`${AUTH_SERVICE}/${endpoint}/me`),
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.logged = true;
    },
    goLogin: state => {
      state.registered = false;
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
        state.logged = true;
      },
    );

    //REGISTER
    builder.addCase(register.fulfilled, state => {
      state.registered = true;
    });

    //ME
    builder.addCase(
      me.fulfilled,
      (state, action: PayloadAction<ApiResponse<unknown>>) => {
        const response = action.payload as ApiResponse<{
          id_usuario: number;
          uuid: string;
          correo: string;
          nombre_completo: string;
          username: string;
          imagen_perfil: string;
        }>;
        state.id_usuario = response.data?.id_usuario || 0;
        state.correo = response.data?.correo || undefined;
        state.nombre_completo = response.data?.nombre_completo || undefined;
        state.first_name =
          response.data?.nombre_completo.split(" ")[0] || undefined;
        state.username = response.data?.username || undefined;
        state.uuid = response.data?.uuid || undefined;
        state.imagen_perfil = response.data?.imagen_perfil || undefined;
      },
    );

    //LOGOUT
    builder.addCase(PURGE, state => {
      state = initialState;
      return state;
    });
  },
});

export const { setTokens, goLogin } = authSlice.actions;

export const selectAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;

export default authSlice.reducer;
