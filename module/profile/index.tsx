import {Col, Image} from "antd";
import React from "react";
import {
  BankOutlined,
  DollarOutlined,
  LogoutOutlined,
  PhoneOutlined,
  SoundOutlined,
  UserOutlined,
} from "@ant-design/icons";

export function Profile() {
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="bg-primary w-full p-4 text-white flex justify-center items-center">
          <h1 className="text-xl">Hồ sơ</h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-4">
          <div className="flex flex-col items-center mb-6">
            <Image
              src="img/logo.png"
              alt="Profile"
              className="h-24 w-24 rounded-full"
            />
            <h2 className="text-2xl font-bold mt-4">Lee</h2>
            <p className="text-gray-600">098765432</p>
          </div>
          <div className="space-y-4">
            <button className="w-full bg-primary text-white py-2 px-4 rounded flex items-center justify-start">
              <BankOutlined />
              <span className="mx-2">Thông tin Ngân hàng trả nợ</span>
            </button>
            <button className="w-full bg-primary text-white py-2 px-4 rounded flex items-center justify-start">
              <DollarOutlined />
              <span className="mx-2">Hợp đồng vay</span>
            </button>
            <button className="w-full bg-primary text-white py-2 px-4 rounded flex items-center justify-start">
              <UserOutlined />
              <div className="mx-2">Thông tin cá nhân</div>
            </button>
            <button className="w-full bg-primary text-white py-2 px-4 rounded flex items-center justify-start">
              <SoundOutlined />
              <span className="mx-2"> Liên hệ tư vấn - hỗ trợ</span>
            </button>
            <button className="w-full bg-primary text-white py-2 px-4 rounded flex items-center justify-start">
              <PhoneOutlined />
              <span className="mx-2">Liên hệ tổng đài 1900999953</span>
            </button>
          </div>
          <button className="w-full bg-primary text-white py-2 px-4 rounded mt-4 flex items-center justify-center">
            <LogoutOutlined />
            <span className="mx-2">Đăng xuất</span>
          </button>
          <div className="w-full text-center">
            <Image
              src="img/congthuong.png"
              className="mt-4"
              alt="Eximbank logo"
              width={100}
            />
          </div>
          <Col>
            <h3>EXIMBANK</h3>
            <div>
              <b>Địa chỉ:</b>
              <span>
                Tầng 8 - Vincom Center, 72 Lê Thánh Tôn và 45A Lý Tự Trọng,
                P.Bến Nghé, Q.1, TP.HCM
              </span>
            </div>
            <div>® Bản quyền thuộc về Eximbank</div>
          </Col>
        </div>
      </div>
    </div>
  );
}
