import {Row} from "antd";
import React from "react";
import {HomeOutlined, UserOutlined, WalletOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";

export default function Footer(): JSX.Element {
  const router = useRouter();
  const handleNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <Row className="flex justify-between px-10 py-2">
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="flex-col justify-center items-center text-center"
        onClick={() => handleNavigate("/wallet")}
      >
        <WalletOutlined />
        <div>Ví tiền</div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="flex-col justify-center items-center text-center"
        onClick={() => handleNavigate("/home")}
      >
        <HomeOutlined />
        <div>Trang chủ</div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="flex-col justify-center items-center text-center"
        onClick={() => handleNavigate("/profile")}
      >
        <UserOutlined />
        <div>Hồ sơ</div>
      </div>
    </Row>
  );
}
