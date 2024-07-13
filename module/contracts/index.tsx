import "./index.scss";
import {Button, notification, Table, Tag} from "antd";
import type {ColumnsType} from "antd/es/table";
import React, {useCallback, useState} from "react";
import {ModalInfo} from "@app/module/home/ModalConfirm";
import {useMutation, useQuery} from "react-query";
import ApiUser from "@api/ApiUser";
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from "moment";
import {debounce} from "lodash";
import Search from "antd/es/input/Search";

export function Contracts(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [params, setParams] = useState({
    pageSize: 10,
    page: 1,
    search: "",
  });

  const approveContractMutation = useMutation(ApiUser.approvalContract);

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

  const debouncedSearch = useCallback(
    debounce((nextValue) => onSearch(nextValue), 300),
    [] // will be created only once initially
  );

  const onSearch = (value: string) => {
    setParams((prevState) => ({
      ...prevState,
      search: value,
    }));
  };

  return (
    <>
      <div className="my-3">
        <Search
          placeholder="SĐT khách hàng"
          allowClear
          onChange={(event) => debouncedSearch(event.target.value)}
          onSearch={onSearch}
          style={{width: 200}}
        />
      </div>
      <Table
        columns={columns}
        loading={dataContract.isLoading}
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
