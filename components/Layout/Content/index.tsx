import React from "react";
import {CommonReactProps} from "@app/types";
import "./index.scss";

export default function Content({children}: CommonReactProps): JSX.Element {
  return <div className="content">{children}</div>;
}
