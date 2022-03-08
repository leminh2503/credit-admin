import CoreApi from "../CoreApi";
import Config from "../../config";
import store from "../../redux/store";
import {UserState} from "../../types/common";
import {NextRouter} from "next/router";

const path = {
  login: "/auth/login",
};

function login(username: string, password: string): Promise<unknown> {
  const data = {usernameOrEmail: username, password};

  return CoreApi({url: path.login, method: "post", data: data});
}

function isLogin(): boolean {
  return !!getAuthToken();
}

function getUserRole(): string {
  const {user} = store.getState() as UserState;
  return user?.role ?? "user";
}

function getAuthToken(): string | null {
  const {user} = store.getState() as UserState;
  return user?.token;
}

function logOut(router: NextRouter, action: {type: string}): void {
  const {user} = store.getState() as UserState;
  const isStaff = user?.isStaff;
  store.dispatch(action);

  if (isStaff) {
    router.push(Config.PATHNAME.ADMIN_AUTH);
  } else {
    router.push(Config.PATHNAME.USER_AUTH);
  }
}

export default {
  login,
  isLogin,
  getAuthToken,
  getUserRole,
  logOut,
};
