import UserConstant from "../constants/UserConstant";

export default {
    userLogin: (user) => {
        return {
            type: UserConstant.USER_LOGIN,
            user
        }
    },

    userLogout: () => {
        return {
            type: UserConstant.USER_LOGOUT,
        }
    },

    userLoginResult: (user) => {
        return {
            type: UserConstant.USER_LOGIN_RESULT,
            user
        }
    },

    userLoginError: (error) => {
        return {
            type: UserConstant.USER_LOGIN_ERROR,
            error
        }
    }
}
