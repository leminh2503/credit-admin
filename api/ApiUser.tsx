import {fetcher} from "./Fetcher";
import store from "../redux/store";
import {IAccountInfo, IAccountRole} from "../types";

interface ILoginBody {
  username: string;
  password: string;
}

const path = {
  login: "/auth/login",
};

function login(body: ILoginBody): Promise<IAccountInfo> {
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
