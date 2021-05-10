import UserConstant from "../constants/UserConstant";

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserConstant.USER_LOGIN:
            return {
                ...state,
                ...action.user
            };
        case UserConstant.USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
