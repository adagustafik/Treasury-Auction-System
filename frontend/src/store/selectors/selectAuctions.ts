import { RootState } from "../store";

export const selectAuctions = (state: RootState) => state.auctionsReducer;
