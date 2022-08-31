import { request } from "../request";
import { Auction } from "./auction";

export const fetchAuctions = () =>
  request<Auction[]>({
    endpoint: "auctions",
    config: {
      method: "GET",
    },
  });
