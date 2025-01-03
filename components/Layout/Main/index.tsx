import React from "react";
import classNames from "classnames";
import {useSelector} from "react-redux";
import Config from "../../../config";
import {IRootState} from "../../../redux/store";
import "./index.scss";
import {CommonReactProps} from "@app/types";

export default function Main({children}: CommonReactProps): JSX.Element {
  const isOpen = useSelector((state: IRootState) => state.menu.isOpen);

  const {useSidebar, useNavbar} = Config.LAYOUT_CONFIG;

  return (
    <div
      className={classNames(
        "main",
        {"has-navbar": useNavbar},
        {"has-sidebar": useSidebar},
        {"sidebar-open": isOpen}
      )}
    >
      {children}
    </div>
  );
}
