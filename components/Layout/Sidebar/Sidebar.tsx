import React, {Fragment} from 'react';
import {Menu, Modal} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from 'next/router'
import MenuAction from "../../../redux/actions/MenuAction";
import UserAction from "../../../redux/actions/UserAction";
import ApiUser from "../../../api/User/ApiUser";
import RouteList from "../../../routes/RouteList";
import {MenuItemProps, SidebarMenuState} from "../../../types/common";

const RenderMenu = React.memo(({userRole, router, menuClose}: MenuItemProps) => {

    React.useEffect(() => {
        setTimeout(() => {
            menuClose();
        }, 50);
        let ele = document.querySelector(".sidebar .ant-menu-item-selected");
        if (ele) {
            ele.scrollIntoView({block: "center", inline: "nearest"});
        }
    }, [router]);

    return (

        <Menu
            mode='inline'
            theme='dark'
            defaultSelectedKeys={[router.pathname]}
            defaultOpenKeys={["/" + router.pathname.split('/')[1]]}
        >
            {
                RouteList.privateRoutes.map(({path, name, children, role}) => {
                    if (role.includes(userRole)) {
                        return null;
                    }
                    if (children) {
                        return (
                            <Menu.SubMenu
                                key={path}
                                title={name}
                            >
                                {
                                    children.map(child => (
                                        <Menu.Item
                                            key={path + child.path}
                                            onClick={() => router.push(path + child.path)}
                                            className='sidebar-item'
                                            hidden={child.role.includes(userRole)}
                                        >
                                            {child.name}
                                        </Menu.Item>
                                    ))
                                }
                            </Menu.SubMenu>
                        );
                    } else {
                        return (
                            <Menu.Item
                                key={path}
                                className='sidebar-item'
                                onClick={() => router.push(path)}
                            >
                                {name}
                            </Menu.Item>
                        );
                    }
                })
            }
        </Menu>
    );
});

/**
 *
 */
export default function Sidebar() {
    const isOpen = useSelector((state: SidebarMenuState) => state.menu.isOpen)
    const router = useRouter()
    const dispatch = useDispatch()
    const userRole = ApiUser.getUserRole()

    const handleLogout = () => {
        Modal.confirm({
            title: "Đăng xuất",
            content: "Bạn có chắc chắn?",
            onOk: () => {
                // dispatch(UserAction.userLogout())
                ApiUser.logOut(router, UserAction.userLogout());
            }
        });
    }

    return (
        <Fragment>
            {/*Sidebar overlay. Only work with screen < 768px*/}
            <div
                className={classNames('sidebar-overlay', {open: isOpen})}
                onClick={() => dispatch(MenuAction.menuToggle())}
            />
            {/*Sidebar*/}
            <div className={classNames('sidebar', {open: isOpen})}>
                <div className='logo-container'>
                    <img src='/img/logo/logo.png' alt='logo'/>
                </div>
                <RenderMenu
                    userRole={userRole}
                    router={router}
                    menuClose={() => dispatch(MenuAction.menuClose())}
                />
                <div onClick={handleLogout} className='sidebar-item cursor-pointer'>
                    <ArrowLeftOutlined/>
                    <span>Đăng xuất</span>
                </div>
            </div>
        </Fragment>
    );
}