import React from 'react';
import classNames from "classnames";
import Config from "../../../config"
import {useSelector} from "react-redux";

export default function Main({children}) {
    const isOpen = useSelector((state) => state.menu.isOpen)

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