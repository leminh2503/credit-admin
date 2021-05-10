import {NextRouter} from "next/router";

/**
 * Menu
 */
export interface ISidebarMenu {
    isOpen: boolean;
}

export type SidebarMenuState = {
    menu: ISidebarMenu;
}

export type SidebarMenuAction = {
    type: string;
    menu: ISidebarMenu;
}

/**
 * Sidebar Item
 */
export interface MenuItemProps {
    userRole: string;
    router: NextRouter;

    menuClose(): void;
}

/**
 * User
 */
export interface IUser {
    email: string;
    userName: string;
    full_name: string;
    token: string;
    role: string;
    isStaff?: boolean
}

export type UserState = {
    user: IUser
}


