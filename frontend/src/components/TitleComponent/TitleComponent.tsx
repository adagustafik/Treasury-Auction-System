import React from "react";
import { IProps } from "./types";
import "./style.sass";

export function TitleComponent({ pageTitle }: IProps) {
  return (
    <div className="page-title-box">
      <h1>{pageTitle}</h1>
    </div>
  );
}
