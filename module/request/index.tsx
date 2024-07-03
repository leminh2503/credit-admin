import "./index.scss";
import {Button, notification, Table, Tag} from "antd";
import type {ColumnsType} from "antd/es/table";
import React, {useState} from "react";
import {ModalInfo} from "@app/module/home/ModalConfirm";
import {useMutation, useQuery} from "react-query";
import ApiUser from "@api/ApiUser";
import moment from "moment";

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
  const [params, setParams] = useState({
    pageSize: 10,
    page: 1,
  });

  const approveContractMutation = useMutation(ApiUser.approvalContract);
  const updateWalletMutation = useMutation(ApiUser.updateWallet);

  const dataContract = useQuery(["dataContract", params], () =>
    ApiUser.listContract(params)
  );

  // const handleUpdateWalletMutation = (id: number) => {
  //
  // }

  const handleApproveContract = (id: number) => {
    approveContractMutation.mutate(id, {
      onSuccess: () => {
        notification.success({
          message: "Duyệt hợp đồng thành công",
          duration: 3,
        });
        dataContract.refetch();
      },
    });
  };

  const handleOk = (): void => {
    setIsModalVisible(false);
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
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
      render: (_, record) => {
        return <div>{record?.userData?.userName}</div>;
      },
    },
    {
      title: "CMND/CCCD",
      dataIndex: "cmnd",
      key: "cmnd",
      align: "center",
      render: (_, record) => {
        return <div>{record?.userData?.cccd}</div>;
      },
    },
    {
      title: "Số tiền rút",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (_, record) => {
        return <div>{record?.amountMoney}</div>;
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (_, record) => {
        switch (record.status) {
          case "pendding":
            return (
              <Tag color="orange" className="my-4">
                Chờ duyệt
              </Tag>
            );
          case "approve":
            return (
              <Tag color="green" className="my-4">
                Đã duyệt
              </Tag>
            );
          case "reject":
            return (
              <Tag color="red" className="my-4">
                Từ chối
              </Tag>
            );
          default:
            return <div />;
        }
      },
    },
    {
      title: "Yêu cầu lúc",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (_) => {
        return <div>{moment(_).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Phê duyệt",
      dataIndex: "note",
      key: "note",
      align: "center",
      render: (_, record) => {
        if (record.status === "approve") {
          return <div />;
        }
        return (
          <Button
            onClick={() => {
              handleApproveContract(record.id);
            }}
            type="primary"
          >
            Phê duyệt
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataContract.data?.records ?? []}
        bordered
        pagination={{
          pageSize: dataContract.data?.pageSize,
          total: dataContract.data?.total,
          showSizeChanger: false,
          onChange: (page) => {
            setParams({
              ...params,
              page,
            });
          },
        }}
      />
      <ModalInfo
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}
