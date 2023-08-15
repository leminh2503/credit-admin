import React, {useMemo} from "react";
import {Menu, MenuProps, Modal} from "antd";
import Image from "next/image";
import {ArrowLeftOutlined} from "@ant-design/icons";
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import ApiUser from "../../../api/ApiUser";
import RouteList from "../../../routes/RouteList";
import {logoutUser} from "@app/redux/slices/UserSlice";
import {IAccountRole} from "@app/types";
import "./index.scss";

const RenderMenu = React.memo(() => {
  const router = useRouter();
  const userRole = ApiUser.getUserRole();

  const menuItems = useMemo(() => {
    return RouteList.filter(
      ({role}) => !(role && userRole ? !role?.includes(userRole) : undefined)
    ).map(({path, name, children}) => {
      if (children) {
        return {
          key: path,
          title: name,
          label: name,
          children: children
            .filter(
              (child) =>
                !child.role?.includes(userRole ?? IAccountRole.ANONYMOUS)
            )
            .map((child) => ({
              key: path + child.path,
              title: child.name,
              label: child.name,
            })),
        };
      }
      return {
        key: path,
        title: name,
        label: name,
      };
    });
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={[router.pathname]}
      defaultOpenKeys={["/" + router.pathname.split("/")[1]]}
      items={menuItems}
      onClick={onClick}
      className="menu-container"
    />
  );
});
RenderMenu.displayName = "RenderMenu";

/**
 *
 */
export default function Sidebar(): JSX.Element {
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

  return (
    <div className={classNames("sidebar")}>
      <div className="logo-container">
        <Image src="/img/logo.png" alt="logo" width={20} height={20} />
      </div>
      <RenderMenu />
      <div
        className="sidebar-item cursor-pointer"
        role="presentation"
        onClick={handleLogout}
      >
        <ArrowLeftOutlined />
        <span>Đăng xuất</span>
      </div>
    </div>
  );
}
