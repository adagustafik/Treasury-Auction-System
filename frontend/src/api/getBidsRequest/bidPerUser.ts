import { Auction } from "../getAuctionsRequest";
import { BidType } from "./types";

export class Bid {
  bidId!: number;

  time!: string;

  type!: BidType;

  amount!: number;

  rate!: number;

  auction!: Auction;
}
