import {fetcher} from "./Fetcher";
import store from "../redux/store";
import {IAccountRole} from "../types";

export interface ILoginBody {
  email: string;
  password: string;
}
export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  role?: number | string;
}

const path = {
  login: "/auth/login",
};

function login(body: ILoginBody): Promise<ILoginResponse> {
  return fetcher(
    {url: path.login, method: "post", data: body},
    {displayError: true}
  );
}

function isLogin(): boolean {
  return !!getAuthToken();
}

function isAnonymous(): boolean {
  const {user} = store.getState();
  return user?.user?.role === IAccountRole.ANONYMOUS;
}

function getUserRole(): IAccountRole | undefined {
  const {user} = store.getState();
  return user?.user?.role;
}

function getAuthToken(): string | undefined {
  const {user} = store.getState();
  return user?.accessToken;
}

export default {
  login,
  isLogin,
  getAuthToken,
  getUserRole,
  isAnonymous,
};
