import React from "react";
import { Link } from "react-router-dom";
import { TopBarComponent } from "../../components";
import { LoginFormComponent } from "../../components/LoginFormComponent";
import "./style.sass";

export function LoginPage() {
  return (
    <>
      <TopBarComponent>
        <Link to="/register">REGISTER</Link>
      </TopBarComponent>
      <div className="spacing" />
      <LoginFormComponent />
    </>
  );
}
