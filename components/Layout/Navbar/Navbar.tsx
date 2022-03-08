import React from "react";
import Link from "next/link";
import {Breadcrumb, Avatar, Menu, Dropdown, Modal} from "antd";
import {
  MenuOutlined,
  UserOutlined,
  DownOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import MenuAction from "../../../redux/actions/MenuAction";
import ApiUser from "../../../api/User/ApiUser";
import RouteList from "../../../routes/RouteList";
import {UserState} from "../../../types/common";
import UserAction from "../../../redux/actions/UserAction";

/**
 *
 */
export default function Navbar(): JSX.Element {
  const user = useSelector((state: UserState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = (): void => {
    Modal.confirm({
      title: "Đăng xuất",
      content: "Bạn có chắc chắn?",
      onOk: () => {
        ApiUser.logOut(router, UserAction.userLogout());
      },
    });
  };

  const toggleMenu = (): void => {
    dispatch(MenuAction.menuToggle());
  };

  const getName = (): Array<string> => {
    const arrayName = [];
    const arrayPath = router.pathname.split("/");
    if (arrayPath.length >= 2) {
      const childFirst = RouteList.privateRoutes.find(
        (item) => item.path === "/" + arrayPath[1]
      );
      if (childFirst) {
        arrayName.push(childFirst.name);
        const childSecond = childFirst.children?.find(
          (item) => item.path === "/" + arrayPath[2]
        );
        if (childSecond) {
          arrayName.push(childSecond.name);
        }
      }
    }
    return arrayName;
  };

  const arrayName = getName();
  const fullName = user.full_name ?? "Không xác định";

  /**
   *
   * @returns {*}
   */
  const renderDropdown = (): JSX.Element => (
    <Menu>
      <Menu.Item key="0">
        <Link href="/user/home" passHref>
          <div>
            <UserOutlined />
            &nbsp;Thông tin
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link href="/thong-bao/view" passHref>
          <div className="row-all-center">
            <BellOutlined />
            &nbsp;Thông báo&nbsp;
          </div>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={handleLogout}>
        <div>
          <LogoutOutlined />
          &nbsp;Đăng xuất
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar flex items-center justify-between">
      <div className="flex items-center">
        <MenuOutlined onClick={toggleMenu} />
        <Breadcrumb className="ml-3">
          <Breadcrumb.Item>{arrayName[0]}</Breadcrumb.Item>
          <Breadcrumb.Item>{arrayName[1]}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="group-user-info">
        <Dropdown overlay={renderDropdown()} trigger={["click"]}>
          <div className="cursor-pointer flex items-center">
            <Avatar size="default" icon={<UserOutlined />} />
            <span className="ml-2 hidden md:flex">{fullName}</span>
            <DownOutlined className="ml-2" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
