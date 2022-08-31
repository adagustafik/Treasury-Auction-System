import { AnyAction } from "@reduxjs/toolkit";
import {
  FETCH_BIDS_DATA_FAIL,
  FETCH_BIDS_DATA_START,
  FETCH_BIDS_DATA_SUCCESS,
} from "./bidsActions";

const initialState = {
  bids: [],
  isLoading: false,
  error: null,
  message: "no error so far",
};

export const bidsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_BIDS_DATA_START:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_BIDS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bids: action.bids,
      };

    case FETCH_BIDS_DATA_FAIL: {
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
