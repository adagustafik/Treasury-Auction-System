import { request } from "../request";
import { LoginResponse } from "./types";

export const fetchLogin = (body: { username: string; password: string }) =>
  request<LoginResponse>({
    endpoint: "login",
    config: {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(body),
    },
  });
