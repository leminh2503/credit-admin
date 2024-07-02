import React, {useEffect, useState} from "react";
import {Avatar, Button, Dropdown, Input, Menu, Modal} from "antd";
import {
  MenuOutlined,
  UserOutlined,
  DownOutlined,
  BellOutlined,
  LogoutOutlined,
  PropertySafetyOutlined,
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "@app/redux/store";
import {loginUser} from "@app/redux/slices/UserSlice";
import {toggleMenu} from "@app/redux/slices/MenuSlice";
import {useQuery} from "react-query";
import {IUserLogin} from "@app/types";
import ApiUser from "@app/api/ApiUser";
import "./index.scss";
import Link from "next/link";

/**
 *
 */
export default function Navbar(): JSX.Element {
  const user = useSelector((state: IRootState) => state.user);

  const dispatch = useDispatch();
  const [openModal, setModal] = useState(false);

  const toggleModal = (): void => {
    setModal(!openModal);
  };
  const handleOk = () => {
    toggleModal();
  };
  const getMeData = (): Promise<IUserLogin> => {
    return ApiUser.getMe();
  };

  const dataUser = useQuery("dataUser", getMeData);

  useEffect(() => {
    dataUser.refetch().then((data) => {
      dispatch(loginUser({...user, user: data?.data}));
    });
  }, []);

  // const handleLogout = (): void => {
  //   Modal.confirm({
  //     title: "Đăng xuất",
  //     content: "Bạn có chắc chắn?",
  //     onOk: () => {
  //       dispatch(logoutUser());
  //     },
  //   });
  // };
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
      <Menu.Item key="2" onClick={() => {}}>
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
        <Button
          type="primary"
          shape="round"
          className="button-change-password"
          icon={<PropertySafetyOutlined />}
          onClick={toggleModal}
          size="large"
        >
          Đổi mật khẩu
        </Button>
      </div>
      <div className="group-user-info">
        <Dropdown overlay={renderDropdown()} trigger={["click"]}>
          <div className="cursor-pointer flex items-center">
            <Avatar size="default" icon={<UserOutlined />} />
            <span className="ml-2 hidden md:flex">
              {dataUser?.data?.fullName}
            </span>
            <DownOutlined className="ml-2" />
          </div>
        </Dropdown>
      </div>

      <Modal
        title="Đổi mật khẩu"
        open={openModal}
        onOk={handleOk}
        UI
        onCancel={() => toggleModal()}
      >
        <Input className="mt-4" size="large" placeholder="Nhập mật khẩu mới" />
        <Input
          className="mt-4"
          size="large"
          placeholder="Nhập lại mật khẩu mới"
        />
      </Modal>
    </div>
  );
}
