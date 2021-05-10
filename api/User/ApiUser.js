import CoreApi from "../CoreApi";
import store from "../../redux/store";
import Config from "../../config"

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
    return store.getState().user?.role ?? "user";
}

function getAuthToken() {
    return store.getState().user?.token;
}

function logOut(router, action) {
    const isStaff = store.getState().user?.isStaff;
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
