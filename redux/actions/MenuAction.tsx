import MenuConstant from "../constants/MenuConstant";

export default {
    menuOpen: () => {
        return {
            type: MenuConstant.MENU_OPEN
        }
    },

    menuClose: () => {
        return {
            type: MenuConstant.MENU_CLOSE
        }
    },

    menuToggle: () => {
        return {
            type: MenuConstant.MENU_TOGGLE
        }
    }
}
