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
  {
    path: "/home",
    name: "Khách hàng",
    icon: "Homepage",
    isSSR: true,
    isSidebar: true,
  },
  {
    path: "/request",
    name: "Yêu cầu rút tiền",
    icon: "Homepage",
    isSidebar: true,
  },
];

export default routes;
