import { AnyAction } from "@reduxjs/toolkit";
import {
  FETCH_PURCHASES_DATA_FAIL,
  FETCH_PURCHASES_DATA_START,
  FETCH_PURCHASES_DATA_SUCCESS,
} from "./purchasesActions";

const initialState = {
  purchases: [],
  isLoading: false,
  error: null,
  message: "no error so far",
};

export const purchasesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_PURCHASES_DATA_START:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_PURCHASES_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        purchases: action.purchases,
      };

    case FETCH_PURCHASES_DATA_FAIL: {
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
