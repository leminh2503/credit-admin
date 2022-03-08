import UserConstant from "../constants/UserConstant";
import {CommonReduxAction} from "../../types/common";

export default {
  userLogout: (): CommonReduxAction => ({
    type: UserConstant.USER_LOGOUT,
  }),

  userLogin: (user: unknown): {type: string; user: unknown} => ({
    type: UserConstant.USER_LOGIN,
    user,
  }),
};
