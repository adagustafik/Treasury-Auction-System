import { AnyAction } from "@reduxjs/toolkit";
import {
  FETCH_AUCTIONS_DATA_FAIL,
  FETCH_AUCTIONS_DATA_START,
  FETCH_AUCTIONS_DATA_SUCCESS,
} from "./auctionsActions";

const initialState = {
  auctions: [],
  isLoading: false,
  error: null,
  message: "no error so far",
};

export const auctionsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_AUCTIONS_DATA_START:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_AUCTIONS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        auctions: action.auctions,
      };

    case FETCH_AUCTIONS_DATA_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
};
