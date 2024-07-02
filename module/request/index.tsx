import "./index.scss";
import {Table} from "antd";
import type {ColumnsType} from "antd/es/table";
import React, {useState} from "react";
import {ModalInfo} from "@app/module/home/ModalConfirm";

const data = [
  {
    phone: "987654321",
    name: "Trung van",
    status: "Thành công",
    cmnd: "123456789",
    amount: "1,000,000",
    note: "Ghi chú",
    completeDate: "09:21 AM, 29-06-2024",
  },
  {
    phone: "987654321",
    name: "Trung van",
    status: "Thành công",
    cmnd: "123456789",
    amount: "1,000,000",
    note: "Ghi chú",
    completeDate: "09:21 AM, 29-06-2024",
  },
  {
    phone: "987654321",
    name: "Trung van",
    status: "Thành công",
    cmnd: "123456789",
    amount: "1,000,000",
    note: "Ghi chú",
    completeDate: "09:21 AM, 29-06-2024",
  },
  {
    phone: "987654321",
    name: "Trung van",
    status: "Thành công",
    cmnd: "123456789",
    amount: "1,000,000",
    note: "Ghi chú",
    completeDate: "09:21 AM, 29-06-2024",
  },
  {
    phone: "987654321",
    name: "Trung van",
    status: "Thành công",
    cmnd: "123456789",
    amount: "1,000,000",
    note: "Ghi chú",
    completeDate: "09:21 AM, 29-06-2024",
  },
];

export function Request(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const handleOk = (): void => {
    setIsModalVisible(false);
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
  };

  const onRow = () => {
    return {
      onDoubleClick: (): void => {
        showModal();
      },
    };
  };

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Khách hàng",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "CMND/CCCD",
      dataIndex: "cmnd",
      key: "cmnd",
      align: "center",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Số tiền rút",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      align: "center",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      align: "center",
    },
    {
      title: "Yêu cầu lúc",
      dataIndex: "completeDate",
      key: "completeDate",
      align: "center",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} bordered onRow={onRow} />
      <ModalInfo
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}
