import { request } from "../request";
import { Bid } from "./bidPerUser";

export const fetchBids = () =>
  request<Bid[]>({
    endpoint: "bid/bids",
    config: {
      method: "GET",
    },
  });
