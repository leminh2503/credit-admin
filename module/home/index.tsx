import "./index.scss";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  notification,
  Popconfirm,
  Switch,
  Table,
  Tag,
} from "antd";
import type {ColumnsType} from "antd/es/table";
import React, {useCallback, useState} from "react";
import {DeleteOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import ApiUser from "@api/ApiUser";
import {useMutation, useQuery} from "react-query";
import moment from "moment";
import Search from "antd/es/input/Search";
import {debounce} from "lodash";

export function Home(): JSX.Element {
  const router = useRouter();
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
    status: [],
    search: "",
  });
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [error, setError] = useState("");
  const [userSelected, setUserSelected] = useState<any>(null);
  const [password, setPassword] = useState("");
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

  const updateErrorMutation = useMutation(ApiUser.updateErrorUser);

  const handleOkError = () => {
    updateErrorMutation.mutate(
      {
        id: userSelected?.id,
        error: error,
      },
      {
        onSuccess: () => {
          setOpenModalChangePassword(!openModalChangePassword);
          dataUser.refetch();
          notification.success({
            message: "Thay đổi thành công",
          });
        },
      }
    );
  };

  const toggleModalError = (user?: any) => {
    setOpenModalError(!openModalError);
    setUserSelected(user ?? null);
    setError(user?.error ?? "");
  };

  const toggleModalChangePassword = (user?: any) => {
    setOpenModalChangePassword(!openModalChangePassword);
    setUserSelected(user ?? null);
    setPassword("");
  };

  const updatePasswordMutation = useMutation(ApiUser.updatePasswordUser);

  const handleOk = () => {
    updatePasswordMutation.mutate(
      {
        id: userSelected?.id,
        newPassword: password,
      },
      {
        onSuccess: () => {
          setPassword("");
          setOpenModalChangePassword(!openModalChangePassword);
          notification.success({
            message: "Thay đổi thành công",
          });
        },
      }
    );
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
      title: "SĐT",
      dataIndex: "phoneNumberRelatives",
      align: "center",
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
      title: "Lỗi khách hàng",
      dataIndex: "error",
      key: "error",
      align: "center",
      render: (_, record) => {
        return (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <a
            onClick={() => {
              toggleModalError(record);
            }}
            className="color-primary"
          >
            Thông tin lỗi
          </a>
        );
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
          defaultChecked={record?.lock}
          onChange={(value) => onChangeSwitch(value, record)}
        />
      ),
    },
    {
      title: "Đổi mật khẩu khách hàng",
      key: "address",
      align: "center",
      render: (_, record) => {
        return (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <a
            onClick={() => {
              toggleModalChangePassword(record);
            }}
            className="color-primary"
          >
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

  const updateLockMutation = useMutation(ApiUser.updateLock);

  const onChangeSwitch = (checked: boolean, user: any) => {
    updateLockMutation.mutate(
      {
        lock: checked,
        id: user.id,
      },
      {
        onSuccess: () => {
          dataUser.refetch();
        },
      }
    );
  };

  const handleNavigateDetail = (id: number) => {
    router.push({
      pathname: "/profile",
      query: {id: id},
    });
  };

  const debouncedSearch = useCallback(
    debounce((nextValue) => onSearch(nextValue), 300),
    [] // will be created only once initially
  );

  const onChange = (checkedValues: any) => {
    setParams((prevState) => ({
      ...prevState,
      status: checkedValues,
    }));
  };

  const onSearch = (value: string) => {
    setParams((prevState) => ({
      ...prevState,
      search: value,
    }));
  };

  const options = [
    {label: "Chưa xác minh", value: "created"},
    {label: "Đã duyệt hồ sơ", value: "success"},
    {label: "Đã tạo hồ sơ", value: "create_profile"},
  ];

  return (
    <>
      <Checkbox.Group
        options={options}
        value={params.status}
        onChange={onChange}
      />

      <div className="my-3">
        <Search
          placeholder="SĐT hoặc CCCD"
          allowClear
          onChange={(event) => debouncedSearch(event.target.value)}
          onSearch={onSearch}
          style={{width: 200}}
        />
      </div>

      <Table
        columns={columns}
        loading={dataUser.isLoading}
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
        <Input
          className="mt-4"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          size="large"
          placeholder="Nhập mật khẩu mới"
        />
        <Input
          className="mt-4"
          size="large"
          placeholder="Nhập lại mật khẩu mới"
        />
      </Modal>

      <Modal
        title="Lỗi"
        open={openModalError}
        onOk={handleOkError}
        onCancel={() => toggleModalError()}
      >
        <Input
          className="mt-4"
          value={error}
          onChange={(event) => setError(event.target.value)}
          size="large"
          placeholder="Nhập lỗi khách hàng"
        />
      </Modal>
    </>
  );
}
