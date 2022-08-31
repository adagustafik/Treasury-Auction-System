import { RootState } from "../store";

export const selectBids = (state: RootState) => state.bidsReducer;
