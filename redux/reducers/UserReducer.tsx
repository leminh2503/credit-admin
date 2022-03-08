import UserConstant from "../constants/UserConstant";

const initialState = {};

// eslint-disable-next-line default-param-last
const userReducer = (state = initialState, action): unknown => {
  switch (action.type) {
    case UserConstant.USER_LOGIN:
      return {
        ...state,
        ...action.user,
      };
    case UserConstant.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
