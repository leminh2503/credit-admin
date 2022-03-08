import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {Button, Input, Card, Row} from "antd";
import Image from "next/image";
import {
  LockOutlined,
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import UserAction from "../../redux/actions/UserAction";
import ApiUser from "../../api/User/ApiUser";
import ValidationHelper from "../../utils/validation/ValidationHelper";
import {AdminLoginApiData} from "../../types/admin/login";
import {useRouter} from "next/router";
import Config from "../../config";

export default function AdminLogin(): JSX.Element {
  const requiredFields = [
    {
      label: "Tài khoản",
      key: "username",
    },
    {
      label: "Mật khẩu",
      key: "password",
    },
  ];

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [isLoading, setIsLoading] = useState(false);
  const renderPasswordIcon = useCallback(
    (visible): React.ReactNode =>
      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />,
    []
  );

  const dispatch = useDispatch();

  const router = useRouter();

  const handleLogin = (): void => {
    if (
      isLoading &&
      !ValidationHelper.checkValidFormData({username, password}, requiredFields)
    ) {
      return;
    }

    setIsLoading(true);
    ApiUser.login(username, password)
      .then((data: AdminLoginApiData) => {
        setIsLoading(false);
        data.isStaff = true;
        dispatch(UserAction.userLogin(data));
        router.push(Config.PATHNAME.ADMIN_HOME);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="admin_login_page flex justify-center items-center">
      <Card className="auth-card">
        <Row className="justify-center">
          <div className="mb-3">
            <Image src="/logo192.png" alt="" width={200} height={200} />
          </div>
          <div className="comment">* Trang web dành cho nội bộ công ty</div>
        </Row>
        <div className="mt-3">
          <Input
            type="text"
            size="large"
            prefix={<UserOutlined />}
            placeholder="Tài Khoản"
            value={username}
            onChange={(e): void => setUsername(e.target.value)}
            name="username"
            onPressEnter={(e): void => {
              if (e.key === "Enter") handleLogin();
            }}
          />
          <Input.Password
            type="password"
            size="large"
            placeholder="Mật khẩu"
            prefix={<LockOutlined />}
            value={password}
            iconRender={renderPasswordIcon}
            onChange={(e): void => setPassword(e.target.value)}
            name="password"
            className="mt-3"
            onPressEnter={(e): void => {
              if (e.key === "Enter") handleLogin();
            }}
          />
          <div className="text-center mt-3 items-center">
            <Button
              type="primary"
              size="large"
              style={{width: "100%"}}
              onClick={handleLogin}
              loading={isLoading}
            >
              Đăng nhập
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
