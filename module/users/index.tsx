import "./index.scss";
import {Button, Input, Modal, notification, Space, Table, Tag} from "antd";
import type {ColumnsType} from "antd/es/table";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ApiUser from "@app/api/ApiUser";
import Config from "@app/config";
import {useMutation} from "react-query";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export function Users(): JSX.Element {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!ApiUser.isLogin()) {
      router.push(Config.PATHNAME.LOGIN);
    }
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, {tags}) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const toggleModal = () => {
    setOpenModal(!openModal);
    setPassword("");
    setUsername("");
  };

  const createUserMutation = useMutation(ApiUser.createUser);
  const handleOk = () => {
    createUserMutation.mutate(
      {userName: username, password: password},
      {
        onSuccess: () => {
          notification.success({
            message: "Tạo nhân viên thành công",
          });
          toggleModal();
        },
      }
    );
  };

  return (
    <div>
      <Button
        className="bg-blue-700 text-white my-3"
        type="primary"
        onClick={toggleModal}
      >
        Tạo nhân viên
      </Button>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Thêm nhân viên"
        open={openModal}
        onOk={handleOk}
        onCancel={() => toggleModal()}
      >
        <Input
          className="mt-4"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          size="large"
          placeholder="Nhập username"
        />
        <Input
          className="mt-4"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          size="large"
          placeholder="Nhập mật khẩu"
        />
      </Modal>
    </div>
  );
}
