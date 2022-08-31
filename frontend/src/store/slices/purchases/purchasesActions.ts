import { AnyAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { fetchPurchases, Purchase } from "../../../api";
import { AppThunk } from "../../store";

export const FETCH_PURCHASES_DATA_START = "FETCH_PURCHASES_DATA_START";
export const FETCH_PURCHASES_DATA_SUCCESS = "FETCH_PURCHASES_DATA_SUCCESS";
export const FETCH_PURCHASES_DATA_FAIL = "FETCH_PURCHASES_DATA_FAIL";

export const fetchPurchasesStartAction: AnyAction = {
  type: FETCH_PURCHASES_DATA_START,
};

export const fetchPurchasesSuccessAction = (
  purchases: Purchase[]
): AnyAction => ({
  type: FETCH_PURCHASES_DATA_SUCCESS,
  purchases,
});

export const fetchPurchasesFailAction = (error: string): AnyAction => ({
  type: FETCH_PURCHASES_DATA_FAIL,
  error,
});

export const fetchPurchasesData: AppThunk = async (dispatch) => {
  dispatch(fetchPurchasesStartAction);

  try {
    const purchases = await fetchPurchases();

    dispatch(fetchPurchasesSuccessAction(purchases));
  } catch (error) {
    const { message } = error as Error;
    toast(message);
    dispatch(fetchPurchasesFailAction(message));
  }
};
