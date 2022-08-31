import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  CreateAuctionPage,
  DashboardPage,
  RegisterPage,
  NotFoundPage,
  LoginPage,
  BidsPage,
  AuctionsPage,
  ProfilePage,
} from "../../pages";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors";

export function AppRouter() {
  const { user, admin } = useAppSelector(selectUser);

  const checkAuthorized = (check: string): boolean => {
    switch (check) {
      case "loggedIn":
        return user !== "";
      case "user":
        return user !== "" && admin === false;
      case "admin":
        return user !== "" && admin === true;
      default:
        return true;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {checkAuthorized("loggedIn") && (
        <>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auctions" element={<AuctionsPage />} />
        </>
      )}
      {checkAuthorized("user") && <Route path="/bids" element={<BidsPage />} />}
      {checkAuthorized("admin") && (
        <Route path="/create-auction" element={<CreateAuctionPage />} />
      )}
      {!checkAuthorized("loggedIn") && (
        <>
          <Route path="/dashboard" element={<Navigate to="/" />} />
          <Route path="/profile" element={<Navigate to="/" />} />
          <Route path="/auctions" element={<Navigate to="/" />} />
          <Route path="/bids" element={<Navigate to="/" />} />
          <Route path="/create-auction" element={<Navigate to="/" />} />
        </>
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
