import { BidType } from "../../api/getBidsRequest";
import { FilterType } from "../types";

export interface AuctionTableProp {
  filterOnly: FilterType;
  limit?: number;
  expanded: boolean;
}

export interface BidTypeState {
  bidtype: BidType;
  selected: boolean;
}
