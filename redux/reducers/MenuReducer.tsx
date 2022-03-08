import MenuConstant from "../constants/MenuConstant";

const initialState = {
  isOpen: false,
};

interface IMenuState {
  isOpen: boolean;
}

/**
 *
 */
// eslint-disable-next-line default-param-last
const menuReducer = (state = initialState, {type}): IMenuState => {
  switch (type) {
    case MenuConstant.MENU_OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case MenuConstant.MENU_CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    case MenuConstant.MENU_TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

export default menuReducer;
