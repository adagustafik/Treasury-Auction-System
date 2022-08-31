import { request } from "../request";
import { IResponse } from "../types";

export const fetchLogout = () =>
  request<IResponse>({
    endpoint: "logout",
    config: {
      method: "POST",
    },
  });
