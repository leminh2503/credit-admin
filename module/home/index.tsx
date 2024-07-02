import "./index.scss";
import React from "react";
import {Button, Col, Image, Row} from "antd";
import {DoubleLeftOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";

export function Home(): JSX.Element {
  const router = useRouter();
  const handleClick = () => {
    router.push("/payment");
  };
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-red-600 w-full p-4 text-white flex justify-between items-center">
          <h1 className="text-xl">Xin chào, Lee</h1>
          <div className="flex-col items-center">
            <span className="mr-2">Tổng đài CSKH</span>
            <div>1900999953</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="bg-gray-200 text-center py-2 mb-4 rounded">
            079******98 đã rút 123.000.000 đ
          </div>
          <Image
            src="img/eximbank-1.png"
            alt="Loan Banner"
            className="w-full mb-4"
          />
          <Row className="button-container">
            <Button
              className="button"
              type="primary"
              htmlType="submit"
              onClick={handleClick}
            >
              Đăng ký khoản vay
            </Button>
          </Row>
          <div className="space-y-4 mt-4">
            <button className="w-full border-primary color-primary py-2 px-4 rounded flex items-center justify-between">
              <span>Thủ tục vay nhanh chóng, đơn giản</span>
              <DoubleLeftOutlined />
            </button>
            <button className="w-full border-primary color-primary py-2 px-4 rounded flex items-center justify-between">
              <span>Hạn mức vay lên đến 1 tỷ</span>
              <DoubleLeftOutlined />
            </button>
            <button className="w-full border-primary color-primary py-2 px-4 rounded flex items-center justify-between">
              <span>Nhận tiền chỉ sau 30 phút làm hồ sơ</span>
              <DoubleLeftOutlined />
            </button>
          </div>
          <Image
            src="img/eximbank-2.jpg"
            alt="Loan Banner"
            className="w-full mt-4"
          />
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
