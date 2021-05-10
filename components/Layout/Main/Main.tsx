import React from 'react';
import classNames from "classnames";
import {useSelector} from "react-redux";
import Config from "../../../config"
import {SidebarMenuState} from "../../../types/common";

export default function Main({children}) {
    const isOpen = useSelector((state: SidebarMenuState) => state.menu.isOpen)

    const {useSidebar, useNavbar} = Config.LAYOUT_CONFIG;

    return (
        <div className={classNames(
            'main',
            {"has-navbar" : useNavbar},
            {"has-sidebar" : useSidebar},
            {"sidebar-open" : isOpen},
        )}>
            {children}
        </div>
    );
}