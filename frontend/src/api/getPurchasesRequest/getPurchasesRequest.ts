import { request } from "../request";
import { Purchase } from "./purchase";

export const fetchPurchases = () =>
  request<Purchase[]>({
    endpoint: "purchases",
    config: {
      method: "GET",
    },
  });
