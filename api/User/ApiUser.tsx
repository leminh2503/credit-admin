import CoreApi from "../CoreApi";
import Config from "../../config"
import store from "../../redux/store";
import {UserState} from "../../types/common";

const path = {
    login: "/auth/login"
}

function login(username, password) {
    const data = {usernameOrEmail: username, password};

    return CoreApi({url: path.login, method: "post", data: data});
}

function isLogin() {
    return !!getAuthToken();
}

function getUserRole() {
    const {user} = store.getState() as UserState
    return user?.role ?? "user";
}

function getAuthToken() {
    const {user} = store.getState() as UserState
    return user?.token;
}

function logOut(router, action) {
    const {user} = store.getState() as UserState
    const isStaff = user?.isStaff;
    store.dispatch(action)

    if (isStaff) {
        router.push(Config.PATHNAME.ADMIN_AUTH)
    } else {
        router.push(Config.PATHNAME.USER_AUTH)
    }
}

export default {
    login,
    isLogin,
    getAuthToken,
    getUserRole,
    logOut
}
