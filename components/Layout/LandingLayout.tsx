import React from "react";
import {CommonReactProps} from "@app/types";
import "./index.scss";

export default function LandingLayout({
  children,
}: CommonReactProps): JSX.Element {
  return <div className="wrapper">{children}</div>;
}
