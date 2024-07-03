import "./index.scss";
import {
  Button,
  Input,
  Modal,
  notification,
  Popconfirm,
  Switch,
  Table,
  Tag,
} from "antd";
import type {ColumnsType} from "antd/es/table";
import React, {useState} from "react";
import {DeleteOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import ApiUser from "@api/ApiUser";
import {useMutation, useQuery} from "react-query";
import moment from "moment";

export function Home(): JSX.Element {
  const router = useRouter();
  const [params, setParams] = useState({page: 1, pageSize: 10});
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);

  const deleteUserMutation = useMutation(ApiUser.deleteUser);
  const dataUser = useQuery(["dataUser", params], () =>
    ApiUser.getListUser(params)
  );

  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id, {
      onSuccess: () => {
        dataUser.refetch();
        notification.success({
          message: "Xoá thành công",
          duration: 3,
        });
      },
    });
  };

  const toggleModalChangePassword = () => {
    setOpenModalChangePassword(!openModalChangePassword);
  };

  const handleOk = () => {
    setOpenModalChangePassword(!openModalChangePassword);
  };
  const onRow = () => {
    return {
      onDoubleClick: (): void => {
        // showModal();
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
      dataIndex: "userName",
      align: "center",
    },
    {
      title: "Trạng thái hồ sơ",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => {
        switch (record.status) {
          case "created":
            return <Tag color="orange">Chưa xác minh</Tag>;
          case "success":
            return <Tag color="green">Đã duyệt hồ sơ</Tag>;
          case "create_profile":
            return <Tag color="">Đã tạo hồ sơ</Tag>;
          default:
            return <div />;
        }
      },
    },
    {
      title: "Thời gian khởi tạo đăng ký",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (_) => {
        return <div>{moment(_).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Thời gian hoàn thành đăng ký",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (_) => {
        return <div>{moment(_).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Hồ sơ",
      key: "address",
      dataIndex: "id",
      align: "center",
      render: (_) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <a
          onClick={() => {
            handleNavigateDetail(_);
          }}
          className="color-primary"
        >
          Xem chi tiết
        </a>
      ),
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
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_) => {
        return (
          <Popconfirm
            title="Xoá khách hàng"
            description="Bạn có chắc chắn muốn xoá khách hàng?"
            onConfirm={() => {
              handleDeleteUser(_);
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

  const handleNavigateDetail = (id: number) => {
    router.push({
      pathname: "/profile",
      query: {id: id},
    });
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUser.data?.records ?? []}
        bordered
        onRow={onRow}
        pagination={{
          current: params.page,
          pageSize: params.pageSize,
          total: dataUser.data?.total,
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
