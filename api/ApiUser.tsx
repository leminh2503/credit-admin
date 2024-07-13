import {fetcher} from "./Fetcher";
import store from "../redux/store";
import {IAccountRole, IUserLogin} from "../types";

export interface ILoginBody {
  email: string;
  password: string;
}
export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  role?: number | string;
}

export interface IParamsGetUser {
  sort?: string[];
  searchFields?: string[];
  pageSize?: number;
  pageNumber?: number;
  disablePagination?: boolean;
  search?: string;
  searchType?: string;
}

export interface IParams {
  pageSize?: number;
  page?: number;
}

const path = {
  login: "/auth/login",
  getMe: "/users/me",
  getUserAccount: "/users",
  listUser: "/admin/user",
  confirmProfile: "/admin/user/approve",
  updateWallet: "/admin/wallet/balance",
  patchWallet: "/admin/wallet",
  listContract: "/contract/admin",
  setting: "/setting",
  lock: "/admin/user/lock",
  statics: "/statistics",
  changePasswordUser: "/admin/user/change-password",
  updatePassword: "/profile/update/password",
  createUser: "/admin/user/create-admin",
  listAdmin: "/admin/user/sp-admin/admin",
  error: "/admin/user/error",
  logWallet: "/admin/wallet/log",
  notification: "/notification/admin",
  request: "/admin/wallet/request",
  bank: "/admin/bank",
};

function updateBank(data: any): Promise<any> {
  return fetcher({
    url: `${path.bank}/${data.id}`,
    method: "patch",
    data: {
      ...data.data,
    },
  });
}
function updateUser(data: any): Promise<any> {
  return fetcher({
    url: `${path.listUser}/${data.id}`,
    method: "patch",
    data: {
      ...data.data,
    },
  });
}

function getRequestUser(id: any): Promise<any> {
  return fetcher({url: `${path.request}/${id}`, method: "get"});
}

function getAllRequest(params: IParams): Promise<any> {
  return fetcher({url: `${path.request}`, method: "get", params});
}

function getNotification(): Promise<any> {
  return fetcher({url: path.notification, method: "get"});
}

function updateErrorUser(data: any): Promise<any> {
  return fetcher({url: path.error, method: "put", data});
}

function patchWallet(data: any): Promise<any> {
  return fetcher({
    url: `${path.patchWallet}/${data.id}`,
    method: "patch",
    data,
  });
}

function getLogWallet(id: any): Promise<any> {
  return fetcher({url: `${path.logWallet}/${id}`, method: "get"});
}

function getListAdmin(params: IParams): Promise<any> {
  return fetcher({url: `${path.listAdmin}`, method: "get", params});
}

function createUser(data: any): Promise<any> {
  return fetcher({url: path.createUser, method: "post", data});
}

function updatePassword(data: any): Promise<any> {
  return fetcher({url: path.updatePassword, method: "put", data});
}

function updatePasswordUser(data: any): Promise<any> {
  return fetcher({url: path.changePasswordUser, method: "put", data});
}

function getStatics(date: string): Promise<any> {
  return fetcher({url: `${path.statics}/${date}`, method: "get"});
}

function updateLock(data: any): Promise<any> {
  return fetcher({url: path.lock, method: "put", data});
}

function getSettings(): Promise<any> {
  return fetcher({url: path.setting, method: "get"});
}

function updateSettings(data: any): Promise<any> {
  return fetcher({url: path.setting, method: "patch", data});
}

function getUserAccount(params?: IParamsGetUser): Promise<IUserLogin[]> {
  return fetcher({url: path.getUserAccount, method: "get", params: params});
}

function getMe(): Promise<IUserLogin> {
  return fetcher({url: path.getMe, method: "get"});
}

function login(body: any): Promise<any> {
  return fetcher(
    {url: path.login, method: "post", data: body},
    {displayError: true}
  );
}

function isLogin(): boolean {
  return !!getAuthToken();
}

function getUserRole(): IAccountRole | undefined {
  const {user} = store.getState();
  return user?.user?.user?.role?.id;
}

function getAuthToken(): string | undefined {
  const {user} = store.getState();
  return user?.user?.user?.token;
}

function getListUser(params: IParams): Promise<any> {
  return fetcher({
    url: path.listUser,
    method: "get",
    params: {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 10,
      ...params,
    },
  });
}

function deleteUser(id: number): Promise<any> {
  return fetcher({
    url: `${path.listUser}/${id}`,
    method: "delete",
  });
}

function getDetailUser(id: number): Promise<any> {
  return fetcher({
    url: `${path.listUser}/${id}`,
    method: "get",
  });
}

function confirmProfile(id: string | number): Promise<any> {
  return fetcher({
    url: `${path.confirmProfile}/${id}`,
    method: "put",
  });
}

function updateWallet({id, number, message, type}: any): Promise<any> {
  return fetcher({
    url: `${path.updateWallet}/${id}`,
    method: "post",
    data: {
      number,
      message,
      type,
    },
  });
}

function listContract(params: IParams): Promise<any> {
  return fetcher({
    url: path.listContract + "/all",
    method: "get",
    params,
  });
}

function getContractByUserId(id: string): Promise<any> {
  return fetcher({
    url: `${path.listContract}/${id}`,
    method: "get",
  });
}

function approvalContract(id: number): Promise<any> {
  return fetcher({
    url: path.listContract + "/update/" + id,
    method: "patch",
    data: {
      status: "approve",
    },
  });
}
export default {
  login,
  isLogin,
  getAuthToken,
  getUserRole,
  getMe,
  getUserAccount,
  getListUser,
  deleteUser,
  getDetailUser,
  confirmProfile,
  updateWallet,
  getContractByUserId,
  approvalContract,
  listContract,
  updateSettings,
  getSettings,
  updateLock,
  getStatics,
  updatePasswordUser,
  updatePassword,
  createUser,
  getListAdmin,
  updateErrorUser,
  getLogWallet,
  patchWallet,
  getNotification,
  getRequestUser,
  getAllRequest,
  updateUser,
  updateBank,
};
