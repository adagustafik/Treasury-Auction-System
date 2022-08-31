export interface PurchasesTableProp {
  filterBy: FilterByType;
  auctionId?: number;
}

export type FilterByType = "user" | "auction";
