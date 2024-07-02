import React from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import {AppProps} from "next/app";

export default function Routes({
  Component,
  pageProps,
}: AppProps): JSX.Element | null {
  return (
    <DashboardLayout>
      <Component {...pageProps} />
    </DashboardLayout>
  );
}
