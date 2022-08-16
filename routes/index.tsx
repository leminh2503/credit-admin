import React from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import RouteList, {IRoute} from "./RouteList";
import Config from "../config";
import {AppProps} from "next/app";
import {useRouter} from "next/router";
import LoginComponent from "@app/pages/login";

export default function Routes({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element | null {
  const routerNext = useRouter();

  const login = routerNext.pathname === Config.PATHNAME.LOGIN;

  const isRoute = (key: keyof IRoute): boolean => {
    for (const route of RouteList) {
      if (router.pathname === route.path) {
        return !!route[key];
      }
    }
    return false;
  };

  const goToLogin = (): null => {
    router.push(Config.PATHNAME.LOGIN);
    return null;
  };

  if (typeof window === "undefined" && !isRoute("isSSR")) {
    return null;
  }

  if (login) {
    return <LoginComponent />;
  }

  if (isRoute("isPublic")) {
    return <Component {...pageProps} />;
  }

  if (isRoute("isAuth")) {
    return goToLogin();
  }

  return (
    <DashboardLayout>
      <Component {...pageProps} />
    </DashboardLayout>
  );
}
