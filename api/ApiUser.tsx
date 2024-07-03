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
  updateWallet: "/admin/wallet",
  listContract: "/contract/admin",
};

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
  return user?.user?.accessToken;
}

function getListUser({page = 1, pageSize = 10}: IParams): Promise<any> {
  return fetcher({
    url: path.listUser,
    method: "get",
    params: {
      page: page,
      pageSize: pageSize,
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

function updateWallet({
  id,
  balance,
}: {
  id: string | number;
  balance: string | number;
}): Promise<any> {
  return fetcher({
    url: `${path.updateWallet}/${id}`,
    method: "patch",
    data: {
      balance,
    },
  });
}

function listContract(): Promise<any> {
  return fetcher({
    url: path.listContract + "/all",
    method: "get",
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
};
