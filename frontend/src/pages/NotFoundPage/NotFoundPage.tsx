import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TopBarComponent } from "../../components";
import "./style.sass";

export function NotFoundPage() {
  return (
    <>
      <TopBarComponent>
        <Link to="/register">REGISTER</Link>
      </TopBarComponent>
      <Container className="centered">
        <h1>404</h1>
        <h4>NOT FOUND</h4>
        <p>requested resource could not be found</p>
      </Container>
    </>
  );
}
