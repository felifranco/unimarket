import axios, { AxiosInstance } from "axios";
import { ApiResponse } from "./apiResponse.util";
import { store, persistor } from "../store";
import { service } from "../config/configurations";
import { setTokens } from "../store/auth/authSlice";
import { navigateTo } from "../helper/NavigateHelper";

/**
 * Crea y exporta una instancia de Axios preconfigurada.
 * @remarks
 * Esta instancia puede ser usada en toda la aplicación para mantener consistencia.
 */
const axiosInstance: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Establecer accessToken para las peticiones
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string | null) => void;
  reject: (error: Error | null) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Refresh Token
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    // Respuesta recibida del API
    const originalRequest = error.config;

    // Si es un 401 y no se está intentando refrescar
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = store.getState().auth.refreshToken;

        const response: {
          data: ApiResponse<{
            accessToken: string;
            refreshToken: string;
          }>;
        } = await axiosInstance.post(`${service.AUTH_SERVICE}/auth/refresh`, {
          refreshToken,
        });

        if (response.data.data) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data.data;

          store.dispatch(
            setTokens({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            }),
          );

          processQueue(null, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err as Error, null);

        persistor.purge();
        navigateTo("/login");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Permite hacer peticiones GET.
 * @param url - Ruta relativa del endpoint.
 * @param headers - Cabeceras de la petición.
 */
export const get = async (
  url: string,
  headers?: Record<string, string>,
): Promise<ApiResponse> => {
  const res = await axiosInstance.get<ApiResponse>(url, {
    headers: {
      ...headers,
    },
  });

  const resBody = JSON.stringify(res.data);
  try {
    return JSON.parse(resBody) as ApiResponse;
  } catch {
    throw new Error(`Error parsing response: ${resBody}`);
  }
};

/**
 * Permite hacer peticiones POST.
 * @param url - Ruta relativa del endpoint.
 * @param data - Cuerpo de la petición.
 * @param headers - Cabeceras de la petición.
 */
export const post = async (
  url: string,
  data?: unknown,
  headers?: Record<string, string>,
): Promise<ApiResponse> => {
  const res = await axiosInstance.post<ApiResponse>(url, data, {
    headers: {
      ...headers,
    },
  });

  const resBody = JSON.stringify(res.data);
  try {
    return JSON.parse(resBody) as ApiResponse;
  } catch {
    throw new Error(`Error parsing response: ${resBody}`);
  }
};

/**
 * Permite hacer peticiones PUT.
 * @param url - Ruta relativa del endpoint.
 * @param data - Cuerpo de la petición.
 * @param headers - Cabeceras de la petición.
 */
export const put = async (
  url: string,
  data?: unknown,
  headers?: Record<string, string>,
): Promise<ApiResponse> => {
  const res = await axiosInstance.put<ApiResponse>(url, data, {
    headers: {
      ...headers,
    },
  });

  const resBody = JSON.stringify(res.data);
  try {
    return JSON.parse(resBody) as ApiResponse;
  } catch {
    throw new Error(`Error parsing response: ${resBody}`);
  }
};

/**
 * Permite hacer peticiones DELETE.
 * @param url - Ruta relativa del endpoint.
 * @param headers - Cabeceras de la petición.
 */
export const del = async (
  url: string,
  headers?: Record<string, string>,
): Promise<ApiResponse> => {
  const res = await axiosInstance.delete<ApiResponse>(url, {
    headers: {
      ...headers,
    },
  });

  const resBody = JSON.stringify(res.data);
  try {
    return JSON.parse(resBody) as ApiResponse;
  } catch {
    throw new Error(`Error parsing response: ${resBody}`);
  }
};

/**
 * Permite hacer peticiones PATCH.
 * @param url - Ruta relativa del endpoint.
 * @param data - Cuerpo de la petición.
 * @param headers - Cabeceras de la petición.
 */
export const patch = async (
  url: string,
  data?: unknown,
  headers?: Record<string, string>,
): Promise<ApiResponse> => {
  const res = await axiosInstance.patch<ApiResponse>(url, data, {
    headers: {
      ...headers,
    },
  });

  const resBody = JSON.stringify(res.data);
  try {
    return JSON.parse(resBody) as ApiResponse;
  } catch {
    throw new Error(`Error parsing response: ${resBody}`);
  }
};
