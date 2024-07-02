import "./index.scss";
import {Button, Input, Modal, Popconfirm, Switch, Table, Tag} from "antd";
import type {ColumnsType} from "antd/es/table";
import React, {useState} from "react";
import {ModalInfo} from "@app/module/home/ModalConfirm";
import {DeleteOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";

const data = [
  {
    phone: "987654321",
    name: "Trung van",
    status: "active",
    createdDate: "09:21 AM, 29-06-2024",
    completeDate: "09:21 AM, 29-06-2024",
    block: true,
  },
  {
    phone: "987654321",
    name: "Trung van",
    status: "in_active",
    createdDate: "09:21 AM, 29-06-2024",
    completeDate: "09:21 AM, 29-06-2024",
    block: false,
  },
  {
    phone: "987654321",
    name: "Trung van",
    status: "active",
    createdDate: "09:21 AM, 29-06-2024",
    completeDate: "09:21 AM, 29-06-2024",
    block: false,
  },
  {
    phone: "987654321",
    name: "Trung van",
    status: "active",
    createdDate: "09:21 AM, 29-06-2024",
    completeDate: "09:21 AM, 29-06-2024",
    block: true,
  },
  {
    phone: "987654321",
    name: "Trung van",
    status: "active",
    createdDate: "09:21 AM, 29-06-2024",
    completeDate: "09:21 AM, 29-06-2024",
    block: true,
  },
];

export function Home(): JSX.Element {
  const router = useRouter();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);

  const toggleModalChangePassword = () => {
    setOpenModalChangePassword(!openModalChangePassword);
  };
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
      title: "Tên khách hàng",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Trạng thái hồ sơ",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (_, record) => {
        switch (record.status) {
          case "active":
            return <Tag color="green">Đã duyệt hồ sơ</Tag>;
          case "in_active":
            return <Tag color="orange">Chưa xác minh</Tag>;
          default:
            return <div />;
        }
      },
    },
    {
      title: "Thời gian khởi tạo đăng ký",
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
    },
    {
      title: "Thời gian hoàn thành đăng ký",
      dataIndex: "completeDate",
      key: "completeDate",
      align: "center",
    },
    {
      title: "Hồ sơ",
      key: "address",
      align: "center",
      render: () => {
        return (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <a onClick={handleNavigateDetail} className="color-primary">
            Xem chi tiết
          </a>
        );
      },
    },
    {
      title: "Chặn đăng nhập",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Switch
          className="switch"
          defaultChecked={record.block}
          onChange={onChangeSwitch}
        />
      ),
    },
    {
      title: "Đổi mật khẩu khách hàng",
      key: "address",
      align: "center",
      render: () => {
        return (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <a onClick={toggleModalChangePassword} className="color-primary">
            Đổi mật khẩu khách hàng
          </a>
        );
      },
    },
    {
      title: "Xóa hồ sơ",
      key: "address",
      align: "center",
      render: () => {
        return (
          <Popconfirm
            title="Xoá khách hàng"
            description="Bạn có chắc chắn muốn xoá khách hàng?"
            onConfirm={() => {
              console.log(123);
            }}
            onCancel={() => {
              console.log("123");
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  const onChangeSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const handleNavigateDetail = () => {
    router.push("/profile");
  };

  return (
    <>
      <Table columns={columns} dataSource={data} bordered onRow={onRow} />
      <ModalInfo
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />

      <Modal
        title="Đổi mật khẩu khách hàng"
        open={openModalChangePassword}
        onOk={handleOk}
        onCancel={() => toggleModalChangePassword()}
      >
        <Input className="mt-4" size="large" placeholder="Nhập mật khẩu mới" />
        <Input
          className="mt-4"
          size="large"
          placeholder="Nhập lại mật khẩu mới"
        />
      </Modal>
    </>
  );
}
