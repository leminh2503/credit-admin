import React from "react";
import "./index.scss";
import {Button, Row, Select} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";

export function Payment() {
  const router = useRouter();
  const handleChange = () => {};

  const handleClick = () => {};

  return (
    <div className="max-w-md bg-white mx-auto text-black">
      <div className="background-header p-4">
        <div className="flex items-center mb-4">
          <LeftOutlined onClick={() => router.back()} />
          <span className="text-xl font-bold flex-1 text-center">
            Chọn khoản vay
          </span>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Số tiền vay</label>
          <input
            type="text"
            className="w-full p-2 text-black rounded"
            defaultValue="50,000,000"
          />
          <div className="flex justify-between items-center mt-2 text-black">
            <p className="mt-2">Từ 20 triệu</p>
            <p className="mt-2">Đến 1 tỷ</p>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between text-black">
          <label className="block mb-2 text-black">Chọn thời hạn vay</label>
          <Select
            defaultValue="lucy"
            style={{width: 200}}
            onChange={handleChange}
            options={[
              {value: "jack", label: "6 Tháng"},
              {value: "lucy", label: "12 Tháng"},
              {value: "24", label: "24 Tháng"},
              {value: "36", label: "36 Tháng"},
              {value: "48", label: "48 Tháng"},
              {value: "48", label: "48 Tháng"},
            ]}
          />
        </div>
      </div>
      <div className="background-header loan p-4 rounded-lg m-4">
        <h3 className="text-lg font-semibold mb-2">Thông tin khoản vay</h3>
        <p>Số tiền: 50,000,000 đ</p>
        <p>Thời hạn vay: 60 tháng</p>
        <p>Ngày vay: 02/07/2024</p>
        <p>Hình thức thanh toán: Trả góp mỗi tháng</p>
      </div>
      <div className="mb-4 p-4">
        <div className="flex items-center">
          <p className="w-1/2">Trả nợ kì đầu: </p>
          <p className="w-1/2 font-bold">1,333,333</p>
        </div>
        <div className="flex items-center">
          <p className="w-1/2">Lãi suất hằng tháng: </p>
          <p className="w-1/2 font-bold">1 %</p>
        </div>
        {/*<button className="text-blue-500 underline mt-2">*/}
        {/*  Chi tiết trả nợ*/}
        {/*</button>*/}
      </div>

      <Row className="button-container mx-4">
        <Button
          className="button"
          type="primary"
          htmlType="submit"
          onClick={handleClick}
        >
          Xác nhận khoản vay
        </Button>
      </Row>
    </div>
  );
}
