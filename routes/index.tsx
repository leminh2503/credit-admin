import React from "react";
import LandingLayout from "../components/Layout/LandingLayout";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Custom404 from "../pages/404";
import ApiUser from "../api/User/ApiUser";
import RouteList from "./RouteList";
import Config from "../config";

export default function Routes({
  Component,
  pageProps,
  router,
}): JSX.Element | null {
  const isRoute = (routeName: string): boolean => {
    for (const route of RouteList[routeName]) {
      if (router.pathname === route.path) {
        return true;
      }
    }
    return false;
  };

  if (isRoute("authRoutes")) {
    if (ApiUser.isLogin()) {
      if (["staff", "admin"].includes(ApiUser.getUserRole())) {
        router.push(Config.PATHNAME.ADMIN_HOME);
      } else {
        router.push(Config.PATHNAME.USER_HOME);
      }
      return null;
    }
    return (
      <LandingLayout>
        <Component {...pageProps} />
      </LandingLayout>
    );
  }

  if (isRoute("publicRoutes")) {
    return (
      <LandingLayout>
        <Component {...pageProps} />
      </LandingLayout>
    );
  }
  if (isRoute("privateRoutes")) {
    if (ApiUser.isLogin()) {
      return (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      );
    }
    router.push(Config.PATHNAME.USER_AUTH);
    return null;
  }
  return <Custom404 />;
}
