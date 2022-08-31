import { request } from "../request";
import { IResponse } from "../types";
import { BidType } from "../getBidsRequest";

export const fetchNewBid = (body: {
  time: string;
  type: BidType;
  amount: number;
  rate: number;
  auctionid: number;
}) =>
  request<IResponse>({
    endpoint: "bid/bid",
    config: {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(body),
    },
  });
