import {IAccountRole} from "../types";

export interface IRoute {
  path: string;
  name: string;
  role?: Array<IAccountRole>;
  icon?: string;
  isSidebar?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isUpdating?: boolean;
  isAuth?: boolean;
  isSSR?: boolean;
  children?: IRoute[];
}

const routes: IRoute[] = [
  // {
  //   path: Config.PATHNAME.LOGIN,
  //   name: "Auth",
  //   isAuth: true,
  // },
  // {
  //   path: "/approve-news",
  //   name: "sidebar.approve_new",
  //   role: ["admin"],
  //   icon: "usd_coin_usdc",
  //   isPrivate: true,
  //   isSidebar: true,
  // },
  {
    path: "/",
    name: "Home",
    icon: "Homepage",
    isSSR: true,
    isSidebar: true,
  },
];

export default routes;
