import React from "react";
import { Link } from "react-router-dom";
import {
  SideBarComponent,
  TitleComponent,
  TopBarComponent,
  CreateNewAuctionForm,
} from "../../components";
import "./style.sass";

export function CreateAuctionPage() {
  return (
    <>
      <TopBarComponent>
        <Link to="/">LOGIN</Link>
      </TopBarComponent>
      <div className="page-flex-container">
        <SideBarComponent page="create-auction" />
        <div className="page-content-flex-container">
          <TitleComponent pageTitle="Create New Auction" />
          <CreateNewAuctionForm />
        </div>
      </div>
    </>
  );
}
