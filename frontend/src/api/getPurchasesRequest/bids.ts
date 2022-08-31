import { BidType } from "../getBidsRequest/types";
import { User } from "./user";

export class Bid {
  bidId!: number;

  time!: string;

  type!: BidType;

  amount!: number;

  rate!: number;

  user!: User;
}
