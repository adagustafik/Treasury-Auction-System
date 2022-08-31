import { IRequest } from "./types";
import { API_URL } from "../configuration";

export const request = async <T>({
  config,
  endpoint,
}: IRequest): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...config,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type");

  if (!response.ok && contentType && contentType.includes("text/html")) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  throw new Error("Unhandled response content type");
};
