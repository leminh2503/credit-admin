import "./index.scss";
import {
  Button,
  Input,
  Modal,
  notification,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import type {ColumnsType} from "antd/es/table";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ApiUser from "@app/api/ApiUser";
import Config from "@app/config";
import {useMutation, useQuery} from "react-query";

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
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    if (!ApiUser.isLogin()) {
      router.push(Config.PATHNAME.LOGIN);
    }
  }, []);

  const dataAdmin = useQuery(["dataAdmin", params], () =>
    ApiUser.getListAdmin(params)
  );

  console.log("dataAdmin----", dataAdmin);

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Chặn đăng nhập",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Switch
          className="switch"
          defaultChecked={record?.lock}
          onChange={(value) => onChangeSwitch(value, record)}
        />
      ),
    },
  ];
  const updateLockMutation = useMutation(ApiUser.updateLock);

  const onChangeSwitch = (checked: boolean, user: any) => {
    updateLockMutation.mutate(
      {
        lock: checked,
        id: user.id,
      },
      {
        onSuccess: () => {
          dataAdmin.refetch();
        },
      }
    );
  };

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
      <Table
        columns={columns}
        dataSource={dataAdmin?.data?.records ?? []}
        pagination={{
          current: params.page,
          pageSize: params.pageSize,
          total: dataAdmin.data?.total,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setParams({...params, page, pageSize});
          },
          onShowSizeChange: (page, pageSize) => {
            setParams({...params, page, pageSize});
          },
        }}
      />
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
