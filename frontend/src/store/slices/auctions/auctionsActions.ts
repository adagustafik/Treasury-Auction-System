import { AnyAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { fetchAuctions, Auction } from "../../../api";
import { AppThunk } from "../../store";

export const FETCH_AUCTIONS_DATA_START = "FETCH_AUCTIONS_DATA_START";
export const FETCH_AUCTIONS_DATA_SUCCESS = "FETCH_AUCTIONS_DATA_SUCCESS";
export const FETCH_AUCTIONS_DATA_FAIL = "FETCH_AUCTIONS_DATA_FAIL";

export const fetchAuctionsStartAction: AnyAction = {
  type: FETCH_AUCTIONS_DATA_START,
};

export const fetchAuctionsSuccessAction = (auctions: Auction[]): AnyAction => ({
  type: FETCH_AUCTIONS_DATA_SUCCESS,
  auctions,
});

export const fetchAuctionsFailAction = (error: string): AnyAction => ({
  type: FETCH_AUCTIONS_DATA_FAIL,
  error,
});

export const fetchAuctionsData: AppThunk = async (dispatch) => {
  dispatch(fetchAuctionsStartAction);

  try {
    const auctions = await fetchAuctions();

    dispatch(fetchAuctionsSuccessAction(auctions));
  } catch (error) {
    const { message } = error as Error;
    toast(message);
    dispatch(fetchAuctionsFailAction(message));
  }
};
