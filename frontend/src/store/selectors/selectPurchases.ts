import { RootState } from "../store";

export const selectPurchases = (state: RootState) => state.purchasesReducer;
