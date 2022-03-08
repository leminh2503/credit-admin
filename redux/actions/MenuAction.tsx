import MenuConstant from "../constants/MenuConstant";
import {CommonReduxAction} from "../../types/common";

export default {
  menuOpen: (): CommonReduxAction => ({
    type: MenuConstant.MENU_OPEN,
  }),

  menuClose: (): CommonReduxAction => ({
    type: MenuConstant.MENU_CLOSE,
  }),

  menuToggle: (): CommonReduxAction => ({
    type: MenuConstant.MENU_TOGGLE,
  }),
};
