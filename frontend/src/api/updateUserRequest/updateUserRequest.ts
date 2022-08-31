import { request } from "../request";
import { IResponse } from "../types";

export const fetchUpdateUser = (body: { email: string; password: string }) =>
  request<IResponse>({
    endpoint: "update/profile",
    config: {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(body),
    },
  });
