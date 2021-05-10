import UserConstant from "../constants/UserConstant";

export default {
    userLogout: () => {
        return {
            type: UserConstant.USER_LOGOUT,
        }
    },

    userLogin: (user) => {
        return {
            type: UserConstant.USER_LOGIN,
            user
        }
    },
}
