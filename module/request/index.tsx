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

export function Request(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [params, setParams] = useState({
    pageSize: 10,
    page: 1,
    search: "",
  });

  const dataRequest = useQuery(["dataRequest", params], () =>
    ApiUser.getAllRequest(params)
  );

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
      dataIndex: "fullName",
      align: "center",
      render: (_, record) => {
        return <div>{record?.fullName}</div>;
      },
    },
    {
      title: "CMND/CCCD",
      dataIndex: "cmnd",
      key: "cmnd",
      align: "center",
      render: (_, record) => {
        return <div>{record?.cccd}</div>;
      },
    },
    {
      title: "Số tiền rút",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (_, record) => {
        return (
          <div>
            {record?.balance?
              .toString()
              ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </div>
        );
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (_, record) => {
        switch (record.status) {
          case "SUCCESS":
            return (
              <Tag color="green" className="my-4">
                Thành công
              </Tag>
            );
          case "ERROR":
            return (
              <Tag color="red" className="my-4">
                Thất bại
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
        return <div>{moment(_).format("DD/MM/YYYY HH:mm:ss")}</div>;
      },
    },
  ];

  console.log("dataRequest.data---", dataRequest.data);

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
        loading={dataRequest.isLoading}
        dataSource={dataRequest.data?.records ?? []}
        bordered
        pagination={{
          pageSize: dataRequest.data?.pageSize,
          total: dataRequest.data?.total,
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
