import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { TopBarProp } from "./types";
import "./style.sass";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors";

export function TopBarComponent({ children }: TopBarProp) {
  const { user } = useAppSelector(selectUser);

  return (
    <Container fluid className="top-bar">
      <Link to="/dashboard">
        <div className="top-bar-child">
          <p>TREASURY</p>
          <p>AUCTION</p>
          <p>SYSTEM</p>
        </div>
      </Link>
      {children && <div className="top-bar-child">{children}</div>}
      {!children && <div className="top-bar-child">{user}</div>}
    </Container>
  );
}
