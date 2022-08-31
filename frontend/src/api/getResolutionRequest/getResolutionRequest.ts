import { request } from "../request";
import { IResponse } from "../types";

export const fetchResolution = () =>
  request<IResponse>({
    endpoint: "auction/resolve",
    config: {
      method: "GET",
    },
  });
