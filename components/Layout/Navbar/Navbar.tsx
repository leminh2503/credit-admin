import React from "react";
import Link from "next/link";
import {Avatar, Menu, Dropdown, Modal} from "antd";
import {
  MenuOutlined,
  UserOutlined,
  DownOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../redux/store";
import {logoutUser} from "../../../redux/slices/UserSlice";
import {toggleMenu} from "../../../redux/slices/MenuSlice";

/**
 *
 */
export default function Navbar(): JSX.Element {
  const user = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    Modal.confirm({
      title: "Đăng xuất",
      content: "Bạn có chắc chắn?",
      onOk: () => {
        dispatch(logoutUser());
      },
    });
  };

  const fullName = user?.user?.lastName ?? "Không xác định";

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
        <MenuOutlined
          onClick={(): void => {
            dispatch(toggleMenu());
          }}
        />
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
