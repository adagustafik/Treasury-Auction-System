import { combineReducers } from "@reduxjs/toolkit";
import { auctionsReducer } from "./slices/auctions";
import { userReducer } from "./slices/user";
import { bidsReducer } from "./slices/bids";
import { purchasesReducer } from "./slices/purchases";

export const rootReducer = combineReducers({
  userReducer,
  auctionsReducer,
  purchasesReducer,
  bidsReducer,
});
