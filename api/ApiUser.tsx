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

export default {
  login,
  isLogin,
  getAuthToken,
  getUserRole,
  getMe,
  getUserAccount,
  getListUser,
  deleteUser,
};
