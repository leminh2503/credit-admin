import {combineReducers} from "redux";
import userReducer from "./UserReducer";
import menuReducer from "./MenuReducer";

const rootReducer = combineReducers({
  user: userReducer,
  menu: menuReducer,
});

export default rootReducer;
