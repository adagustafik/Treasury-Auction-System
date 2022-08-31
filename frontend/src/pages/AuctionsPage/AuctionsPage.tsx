import React from "react";
import {
  AuctionsTableComponent,
  SideBarComponent,
  TitleComponent,
  TopBarComponent,
} from "../../components";

export function AuctionsPage() {
  return (
    <>
      <TopBarComponent />
      <div className="page-flex-container">
        <SideBarComponent page="auctions" />
        <div className="page-content-flex-container">
          <TitleComponent pageTitle="List of running Auctions" />
          <AuctionsTableComponent filterOnly="current" expanded />
          <TitleComponent pageTitle="List of past Auctions & Resolutions" />
          <AuctionsTableComponent filterOnly="history" expanded />
        </div>
      </div>
    </>
  );
}
