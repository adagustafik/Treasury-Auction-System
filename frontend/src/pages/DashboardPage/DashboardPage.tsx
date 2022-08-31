import React, { useEffect } from "react";
import {
  AuctionsTableComponent,
  BidsTableComponent,
  SideBarComponent,
  TitleComponent,
  TopBarComponent,
} from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors";
import { fetchAuctionsData } from "../../store/slices/auctions";
import { fetchBidsData } from "../../store/slices/bids";
import { fetchPurchasesData } from "../../store/slices/purchases";

export function DashboardPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuctionsData);
    dispatch(fetchPurchasesData);
  }, [dispatch]);

  const { admin } = useAppSelector(selectUser);

  useEffect(() => {
    if (admin === false) {
      dispatch(fetchBidsData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [dispatch]);

  return (
    <>
      <TopBarComponent />
      <div className="page-flex-container">
        <SideBarComponent page="dashboard" />
        <div className="page-content-flex-container">
          <TitleComponent pageTitle="List of TOP 5 coming Auctions" />
          <AuctionsTableComponent
            filterOnly="current"
            expanded={false}
            limit={5}
          />
          {admin === false && (
            <TitleComponent pageTitle="List of TOP 5 recent Bids" />
          )}
          {admin === false && (
            <BidsTableComponent filterOnly="current" limit={5} />
          )}
        </div>
      </div>
    </>
  );
}
