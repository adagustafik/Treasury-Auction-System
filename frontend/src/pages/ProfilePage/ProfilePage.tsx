import React from "react";
import {
  RegisterFormComponent,
  SideBarComponent,
  TitleComponent,
  TopBarComponent,
} from "../../components";
import { PurchasesTableComponent } from "../../components/PurchasesTableComponent";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors";

export function ProfilePage() {
  const { admin } = useAppSelector(selectUser);

  return (
    <>
      <TopBarComponent />
      <div className="page-flex-container">
        <SideBarComponent page="profile" />
        <div className="page-content-flex-container">
          {admin === false && (
            <TitleComponent pageTitle="List of all Purchases" />
          )}
          {admin === false && <PurchasesTableComponent filterBy="user" />}
          <TitleComponent pageTitle="Update your email or password" />
          <RegisterFormComponent page="profile" />
        </div>
      </div>
    </>
  );
}
