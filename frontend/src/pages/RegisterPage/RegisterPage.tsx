import React from "react";
import { Link } from "react-router-dom";
import { RegisterFormComponent, TopBarComponent } from "../../components";

export function RegisterPage() {
  return (
    <>
      <TopBarComponent>
        <Link to="/">LOGIN</Link>
      </TopBarComponent>
      <div className="spacing" />
      <RegisterFormComponent page="register" />
    </>
  );
}
