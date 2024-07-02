import React from "react";
import "./index.scss";
import {Button, Image, Row} from "antd";
import {DownloadOutlined, EyeOutlined} from "@ant-design/icons";

export function Wallet() {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow-lg w-full max-w-md">
        <div className="bg-primary text-white p-4">
          <h1 className="text-lg font-semibold text-center">Ví tiền</h1>
        </div>
        <div className="p-2">
          <div className="relative">
            <Image src="img/eximbank-credit.png" />
            <div className="info-credit">
              <p className="font-mono text-white">987****321</p>
              <p className="font-semibold text-white">Le Minh</p>
            </div>
          </div>
          <div className="bg-gray-100 p-2 rounded-lg w-full mt-4">
            <div className="flex justify-between">
              <h3 className="text-gray-600">Số dư ví</h3>
              <div>
                <div className="">
                  <EyeOutlined style={{fontSize: 24}} />
                  <div className="text-xl font-semibold color-primary">
                    0 VND
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row className="button-container mt-4">
            <Button
              className="button flex justify-between items-center"
              type="primary"
              htmlType="submit"
              // onClick={handleClick}
            >
              <span>Rút tiền về tài khoản ngân hàng</span>
              <DownloadOutlined />
            </Button>
          </Row>

          <Image src="img/list-bank.jpg" className="mt-4" />
        </div>
      </div>
    </div>
  );
}
