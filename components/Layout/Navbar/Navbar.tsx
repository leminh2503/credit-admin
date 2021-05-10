import React from 'react';
import Link from 'next/link'
import {Breadcrumb, Avatar, Menu, Dropdown, Modal} from "antd";
import {
    MenuOutlined,
    UserOutlined,
    DownOutlined,
    BellOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from 'next/router'
import MenuAction from "../../../redux/actions/MenuAction";
import ApiUser from "../../../api/User/ApiUser";
import RouteList from "../../../routes/RouteList";
import {UserState} from "../../../types/common";

/**
 *
 */
export default function Navbar() {
    const user = useSelector((state: UserState) => state.user)
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogout = () => {
        Modal.confirm({
            title: "Đăng xuất",
            content: "Bạn có chắc chắn?",
            onOk: () => {
                ApiUser.logOut(router);
            }
        });
    }

    /**
     *
     * @returns {*}
     */
    const renderDropdown = () => {
        return (
            <Menu>
                <Menu.Item key="0">
                    <Link href='/user/home'>
                        <div>
                            <UserOutlined/>&nbsp;Thông tin
                        </div>
                    </Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link href='/thong-bao/view'>
                        <div className='row-all-center'>
                            <BellOutlined/>&nbsp;Thông báo&nbsp;
                        </div>
                    </Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="2" onClick={handleLogout}>
                    <div>
                        <LogoutOutlined/>&nbsp;Đăng xuất
                    </div>
                </Menu.Item>
            </Menu>
        );
    }

    /**
     *
     * @returns {[]}
     */
    const getName = () => {
        const arrayName = [];
        const arrayPath = router.pathname.split('/');
        if (arrayPath.length >= 2) {
            let child_fist = RouteList.privateRoutes.find(item => item.path === '/' + arrayPath[1]);
            if (child_fist) {
                arrayName.push(child_fist.name);
                let child_second = child_fist.children?.find(item => item.path === '/' + arrayPath[2]);
                if (child_second) {
                    arrayName.push(child_second.name);
                }
            }
        }
        return arrayName;
    }

    const arrayName = getName();
    const fullName = user.full_name ?? 'Không xác định';

    return (
        <div className='navbar flex items-center justify-between'>
            <div className='flex items-center'>
                <MenuOutlined onClick={() => dispatch(MenuAction.menuToggle())}/>
                <Breadcrumb className='ml-3'>
                    <Breadcrumb.Item>{arrayName[0]}</Breadcrumb.Item>
                    <Breadcrumb.Item>{arrayName[1]}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='group-user-info'>
                <Dropdown overlay={renderDropdown()} trigger={['click']}>
                    <div className='cursor-pointer flex items-center'>
                        <Avatar size='default' icon={<UserOutlined/>}/>
                        <span className='ml-2 hidden md:flex'>
                            {fullName.shortName()}
                        </span>
                        <DownOutlined className='ml-2'/>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}