import React, {useMemo, useState} from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Menu,
  Modal,
  notification,
  Space,
} from "antd";
import {
  BellOutlined,
  DownOutlined,
  LogoutOutlined,
  PropertySafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "@app/redux/store";
import {logoutUser} from "@app/redux/slices/UserSlice";
import "./index.scss";
import {useRouter} from "next/router";
import {useMutation, useQuery} from "react-query";
import ApiUser from "@api/ApiUser";
import moment from "moment";

/**
 *
 */
export default function Navbar(): JSX.Element {
  const {user} = useSelector((state: IRootState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [openModal, setModal] = useState(false);

  const updatePassword = useMutation(ApiUser.updatePassword);

  const getNotification = useQuery(["getNotification"], () =>
    ApiUser.getNotification()
  );

  const toggleModal = (): void => {
    setModal(!openModal);
  };
  const handleOk = () => {
    updatePassword.mutate(
      {newPassword: newPassword, password: password},
      {
        onSuccess: () => {
          toggleModal();
          notification.success({
            message: "Thay đổi thành công",
          });
          setPassword("");
          setNewPassword("");
        },
      }
    );
  };

  const handleLogout = (): void => {
    Modal.confirm({
      title: "Đăng xuất",
      content: "Bạn có chắc chắn?",
      onOk: () => {
        dispatch(logoutUser());
        router.push("/login");
      },
    });
  };

  const renderDropdownNotification = useMemo(() => {
    return (
      <Menu>
        <div className="font-bold my-2">Trung tâm thông báo</div>
        {getNotification.data?.map((item: any, index: any) => (
          <Menu.Item key={index}>
            <div className="font-bold">{item.title}</div>
            <div>{item.message}</div>
            <div className="text-end">
              {moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </div>
          </Menu.Item>
        ))}
      </Menu>
    );
  }, [getNotification.data]);
  /**
   *
   * @returns {*}
   */
  const renderDropdown = (): JSX.Element => (
    <Menu>
      {/* <Menu.Item key="0"> */}
      {/*  <Link href="/user/home" passHref> */}
      {/*    <div> */}
      {/*      <UserOutlined /> */}
      {/*      &nbsp;Thông tin */}
      {/*    </div> */}
      {/*  </Link> */}
      {/* </Menu.Item> */}
      {/* <Menu.Item key="1"> */}
      {/*  <Link href="/thong-bao/view" passHref> */}
      {/*    <div className="row-all-center"> */}
      {/*      <BellOutlined /> */}
      {/*      &nbsp;Thông báo&nbsp; */}
      {/*    </div> */}
      {/*  </Link> */}
      {/* </Menu.Item> */}
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
      <div className="group-user-info flex items-center">
        <Dropdown
          overlay={renderDropdownNotification}
          trigger={["click"]}
          className="mx-4"
        >
          <div>
            <BellOutlined style={{fontSize: 20}} />
          </div>
        </Dropdown>
        <Dropdown overlay={renderDropdown()} trigger={["click"]}>
          <div className="cursor-pointer flex items-center">
            <Avatar size="default" icon={<UserOutlined />} />
            <span className="ml-2 hidden md:flex">
              {user?.user?.user?.userName}
            </span>
            <DownOutlined className="ml-2" />
          </div>
        </Dropdown>
      </div>

      <Modal
        title="Đổi mật khẩu"
        open={openModal}
        onOk={handleOk}
        onCancel={() => toggleModal()}
      >
        <Input
          className="mt-4"
          size="large"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Nhập mật khẩu mới"
        />
        <Input
          className="mt-4"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          size="large"
          placeholder="Nhập lại mật khẩu mới"
        />
      </Modal>
    </div>
  );
}
