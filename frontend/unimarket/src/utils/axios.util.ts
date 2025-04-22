import axios from "axios";
import { ApiResponse } from "./apiResponse.util";

/**
 * Permite hacer peticiones GET.
 * @param url - Ruta relativa del endpoint.
 * @param headers - Cabeceras de la petición.
 */
export const get = async (
  url: string,
  headers?: Record<string, string>,
): Promise<ApiResponse> => {
  const res = await axios.get<ApiResponse>(url, {
    headers: {
      "Content-Type": "application/json",
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
  const res = await axios.post<ApiResponse>(url, data, {
    headers: {
      "Content-Type": "application/json",
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
  const res = await axios.put<ApiResponse>(url, data, {
    headers: {
      "Content-Type": "application/json",
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
  axios
    .delete<ApiResponse>(url, {
      headers: {
        "Content-Type": "application/json",
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
  axios
    .patch<ApiResponse>(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    })
    .then(res => res.data);
