import axios, { AxiosInstance } from "axios";
import { ApiResponse } from "./apiResponse.util";
import { store } from "../store";

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
export const del = <ApiResponse>(
  url: string,
  headers?: Record<string, string>,
): Promise<ApiResponse> =>
  axiosInstance
    .delete<ApiResponse>(url, {
      headers: {
        ...headers,
      },
    })
    .then(res => res.data);

/**
 * Permite hacer peticiones PATCH.
 * @param url - Ruta relativa del endpoint.
 * @param data - Cuerpo de la petición.
 * @param headers - Cabeceras de la petición.
 */
export const patch = <ApiResponse>(
  url: string,
  data?: unknown,
  headers?: Record<string, string>,
): Promise<ApiResponse> =>
  axiosInstance
    .patch<ApiResponse>(url, data, {
      headers: {
        ...headers,
      },
    })
    .then(res => res.data);
