import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Content from "./Content";
import BottomNavigator from "./BottomNavigator";
import Main from "./Main";
import Config from "../../config";
import {CommonReactProps} from "@app/types";
import "./index.scss";

export default function DashboardLayout({
  children,
}: CommonReactProps): JSX.Element {
  const {useSidebar, useNavbar, useFooter, useBottomNavigator} =
    Config.LAYOUT_CONFIG;
  return (
    <div className="wrapper">
      {useSidebar && <Sidebar />}
      <Main>
        {useNavbar && <Navbar />}
        <Content>
          {children}
          {useBottomNavigator && <BottomNavigator />}
          {useFooter && <Footer />}
        </Content>
      </Main>
    </div>
  );
}
