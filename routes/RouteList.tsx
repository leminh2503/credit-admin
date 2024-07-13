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
  {
    path: "/contracts",
    name: "Danh sách hợp đồng",
    icon: "Homepage",
    isSidebar: true,
  },
  {
    path: "/user",
    name: "Nhân viên",
    icon: "Homepage",
    isSidebar: true,
  },
  {
    path: "/statics",
    name: "Thống kê",
    icon: "Homepage",
    isSidebar: true,
  },
  {
    path: "/settings",
    name: "Cài đặt",
    icon: "Homepage",
    isSidebar: true,
  },
];

export default routes;
