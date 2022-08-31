import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogout } from "../../api";
import { fetchResolution } from "../../api/getResolutionRequest";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors";
import { resetUserDataAction } from "../../store/slices/user";
import "./style.sass";
import { IProps } from "./types";

export function SideBarComponent({ page }: IProps) {
  useEffect(() => {
    const actualLink = document.querySelector(`#${page}`);
    actualLink?.classList.add("clicked");
  });

  const { admin } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLResolution = () => {
    fetchResolution()
      .then((res) => {
        if (res.success) {
          navigate("/dashboard");
          toast(res.success);
        }
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  const handleLogout = () => {
    fetchLogout()
      .then((res) => {
        if (res.success) {
          navigate("/");
          toast(res.success);
          dispatch(resetUserDataAction);
        }
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  return (
    <div className="side-bar-container">
      <div className="d-grid gap-2">
        <Link id="dashboard" className="sidebar-link" to="/dashboard">
          <Button className="sidebar-btn" size="lg">
            Dashboard
          </Button>
        </Link>
        <Link id="profile" className="sidebar-link" to="/profile">
          <Button className="sidebar-btn" size="lg">
            Profile
          </Button>
        </Link>
        <Link id="auctions" className="sidebar-link" to="/auctions">
          <Button className="sidebar-btn" size="lg">
            Auctions
          </Button>
        </Link>
        {admin === false && (
          <Link id="bids" className="sidebar-link" to="/bids">
            <Button className="sidebar-btn" size="lg">
              Bids
            </Button>
          </Link>
        )}
        {admin === true && (
          <Link
            id="create-auction"
            className="sidebar-link"
            to="/create-auction"
          >
            <Button className="sidebar-btn" size="lg">
              Create Auction
            </Button>
          </Link>
        )}
        {admin === true && (
          <div className="sidebar-link">
            <Button
              className="sidebar-btn"
              size="lg"
              onClick={handleLResolution}
            >
              Resolve auctions
            </Button>
          </div>
        )}
        <div className="logout-box">
          <Button className="logout" size="lg" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
