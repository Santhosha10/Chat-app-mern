import { parseApiResponse } from "../utils/api";

const API_BASE_URL = import.meta.env.PROD ? "" : import.meta.env.VITE_API_URL || "";

export const apiRequest = async (url, options = {}) => {
  const endpoint = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

  const res = await fetch(endpoint, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  return parseApiResponse(res);
};
