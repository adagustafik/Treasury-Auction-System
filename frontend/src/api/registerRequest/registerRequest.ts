import { request } from "../request";
import { IResponse } from "../types";

export const fetchRegister = (body: {
  username: string;
  email: string;
  password: string;
}) =>
  request<IResponse>({
    endpoint: "register",
    config: {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(body),
    },
  });
