import { Auction } from "../getAuctionsRequest";
import { Bid } from "./bids";

export class Purchase {
  purchaseId!: number;

  amount!: number;

  rate!: number;

  auction!: Auction;

  bid!: Bid;
}
