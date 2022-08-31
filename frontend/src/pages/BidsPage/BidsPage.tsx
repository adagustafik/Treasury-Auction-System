import React from "react";
import {
  BidsTableComponent,
  SideBarComponent,
  TitleComponent,
  TopBarComponent,
} from "../../components";

export function BidsPage() {
  return (
    <>
      <TopBarComponent />
      <div className="page-flex-container">
        <SideBarComponent page="bids" />
        <div className="page-content-flex-container">
          <TitleComponent pageTitle="List of current Bids" />
          <BidsTableComponent filterOnly="current" />
          <TitleComponent pageTitle="List of previous Bids" />
          <BidsTableComponent filterOnly="history" />
        </div>
      </div>
    </>
  );
}
