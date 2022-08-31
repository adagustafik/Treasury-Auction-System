import { AnyAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { fetchBids, Bid } from "../../../api";
import { AppThunk } from "../../store";

export const FETCH_BIDS_DATA_START = "FETCH_BIDS_DATA_START";
export const FETCH_BIDS_DATA_SUCCESS = "FETCH_BIDS_DATA_SUCCESS";
export const FETCH_BIDS_DATA_FAIL = "FETCH_BIDS_DATA_FAIL";

export const fetchBidsStartAction: AnyAction = {
  type: FETCH_BIDS_DATA_START,
};

export const fetchBidsSuccessAction = (bids: Bid[]): AnyAction => ({
  type: FETCH_BIDS_DATA_SUCCESS,
  bids,
});

export const fetchBidsFailAction = (error: string): AnyAction => ({
  type: FETCH_BIDS_DATA_FAIL,
  error,
});

export const fetchBidsData: AppThunk = async (dispatch) => {
  dispatch(fetchBidsStartAction);

  try {
    const bids = await fetchBids();

    dispatch(fetchBidsSuccessAction(bids));
  } catch (error) {
    const { message } = error as Error;
    toast(message);
    dispatch(fetchBidsFailAction(message));
  }
};
