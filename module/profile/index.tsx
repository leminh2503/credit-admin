import React, {useEffect, useMemo, useState} from "react";
import {Button, Image, Input, notification, Select, Switch, Tag} from "antd";
import {useRouter} from "next/router";
import {useMutation, useQuery} from "react-query";
import {ModalWallet} from "@module/profile/ModalWallet";
import moment from "moment";
import "./index.scss";
import Paragraph from "antd/es/typography/Paragraph";
import ApiUser from "@api/ApiUser";

export function Profile() {
  const [openModalWallet, setOpenModalWallet] = useState(false);
  const [type, setType] = useState(1);
  const {query} = useRouter();
  const [error, setError] = useState("");
  const [isInputError, setIsInputError] = useState(false);
  const dataUser = useQuery(
    ["dataUser", query],
    () => ApiUser.getDetailUser(query?.id as any),
    {
      enabled: !!query?.id,
    }
  );

  const dataRequest = useQuery(
    "dataRequest",
    () => ApiUser.getRequestUser(dataUser?.data?.walletId),
    {
      enabled: false,
    }
  );

  const dataLogWallet = useQuery(
    "dataLogWallet",
    () => ApiUser.getLogWallet(dataUser?.data?.walletId),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (dataUser?.data) {
      dataLogWallet.refetch();
      dataRequest.refetch();
      setError(dataUser?.data?.walletData?.error);
    }
  }, [dataUser?.data]);

  const dataContract = useQuery(
    ["dataContract", query],
    () => ApiUser.getContractByUserId(query?.id as any),
    {
      enabled: !!query?.id,
    }
  );

  const confirmMutation = useMutation(ApiUser.confirmProfile);
  const approveContractMutation = useMutation(ApiUser.approvalContract);
  const handleConfirmProfile = () => {
    confirmMutation.mutate(query?.id as any, {
      onSuccess: () => {
        notification.success({
          message: "Duyệt hồ sơ thành công",
          duration: 3,
        });
        dataUser.refetch();
      },
    });
  };

  const handleApproveContract = () => {
    approveContractMutation.mutate(dataContract?.data?.[0]?.id, {
      onSuccess: () => {
        notification.success({
          message: "Duyệt hợp đồng thành công",
          duration: 3,
        });
        dataContract.refetch();
        dataUser.refetch();
      },
    });
  };

  const toggleModal = (tp?: number) => {
    setType(tp as any);
    setOpenModalWallet(!openModalWallet);
  };

  const updateErrorMutation = useMutation(ApiUser.updateErrorUser);

  const handleOkError = () => {
    updateErrorMutation.mutate(
      {
        id: dataUser?.data?.id,
        error: error,
      },
      {
        onSuccess: () => {
          dataUser.refetch();
          notification.success({
            message: "Thay đổi lỗi thành công",
          });
        },
      }
    );
  };

  const updateWalletMutation = useMutation(ApiUser.patchWallet);

  const handleChangeSwitch = (value: boolean) => {
    updateWalletMutation.mutate(
      {
        id: dataUser?.data?.walletId,
        isError: !value,
      },
      {
        onSuccess: () => {
          dataUser?.refetch();
        },
      }
    );
  };

  const renderStatus = useMemo(() => {
    switch (dataUser?.data?.status) {
      case "created":
        return (
          <Tag color="orange" className="my-4">
            Chưa xác minh
          </Tag>
        );
      case "success":
        return (
          <Tag color="green" className="my-4">
            Đã duyệt hồ sơ
          </Tag>
        );
      case "create_profile":
        return (
          <Tag color="blue" className="my-4">
            Đã tạo hồ sơ
          </Tag>
        );
      default:
        return <div />;
    }
  }, [dataUser]);

  const renderStatusContract = useMemo(() => {
    switch (dataContract?.data?.[0]?.status) {
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
  }, [dataContract]);

  const updateUserMutation = useMutation(ApiUser.updateUser);

  const handleUpdateUser = ({key, value}: {key: string; value: string}) => {
    updateUserMutation.mutate(
      {
        id: dataUser?.data?.id,
        data: {
          [key]: value,
        },
      },
      {
        onSuccess: () => {
          dataUser.refetch();
        },
      }
    );
  };

  const updateBankMutation = useMutation(ApiUser.updateBank);

  const handleUpdateBank = ({key, value}: {key: string; value: string}) => {
    updateBankMutation.mutate(
      {
        id: dataUser?.data?.bankId,
        data: {
          [key]: value,
        },
      },
      {
        onSuccess: () => {
          dataUser.refetch();
        },
      }
    );
  };

  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2 bg-white p-4 rounded-lg shadow flex flex-col">
          <div className="text-center mb-4">
            {renderStatus}
            <Image
              src={dataUser?.data?.cardData?.selfImage}
              alt="User"
              width="100%"
              preview={false}
              className="mx-auto"
            />
          </div>
          <div className="text-center mb-2">
            <p className="font-bold">{dataUser.data?.phoneNumberRelatives}</p>
            <p className="font-bold">{dataUser.data?.userName}</p>
          </div>
          {dataUser.data?.status === "create_profile" && (
            <Button
              type="primary"
              className=" px-4 mt-4 py-1 rounded"
              onClick={handleConfirmProfile}
            >
              Duyệt hồ sơ
            </Button>
          )}
        </div>

        <div className="col-span-12 md:col-span-4 bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <p className="w-1/2 text-sm">Số CMND/CCCD: </p>
              <Paragraph
                className="w-1/2"
                editable={{
                  onChange: (value) => {
                    handleUpdateUser({key: "cccd", value});
                  },
                }}
              >
                {dataUser.data?.cccd}
              </Paragraph>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2 text-sm">Sđt: </p>

              <Paragraph
                className="w-1/2"
                editable={{
                  onChange: (value) => {
                    handleUpdateUser({key: "phoneNumber", value});
                  },
                }}
              >
                {dataUser.data?.phoneNumber}
              </Paragraph>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2 text-sm">Ngày sinh: </p>
              <Paragraph
                className="w-1/2"
                editable={{
                  onChange: (value) => {
                    handleUpdateUser({key: "dateOfBith", value});
                  },
                }}
              >
                {dataUser.data?.dateOfBith}
              </Paragraph>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2 text-sm">Địa chỉ: </p>
              <Paragraph
                className="w-1/2"
                editable={{
                  onChange: (value) => {
                    handleUpdateUser({key: "address", value});
                  },
                }}
              >
                {dataUser.data?.address}
              </Paragraph>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2 text-sm">Nghề nghiệp: </p>

              <Paragraph
                className="w-1/2"
                editable={{
                  onChange: (value) => {
                    handleUpdateUser({key: "job", value});
                  },
                }}
              >
                {dataUser.data?.job}
              </Paragraph>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2 text-sm">Thu nhập: </p>

              <Paragraph
                className="w-1/2"
                editable={{
                  onChange: (value) => {
                    handleUpdateUser({key: "income", value});
                  },
                }}
              >
                {dataUser.data?.income}
              </Paragraph>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2 text-sm">Mục đích vay: </p>

              <Paragraph
                className="w-1/2"
                editable={{
                  onChange: (value) => {
                    handleUpdateUser({key: "loanPurpose", value});
                  },
                }}
              >
                {dataUser.data?.loanPurpose}
              </Paragraph>
            </div>

            <div className="flex items-center justify-between">
              <p className="w-1/2 text-sm">Giới tính: </p>
              <Paragraph
                className="w-1/2"
                editable={{
                  onChange: (value) => {
                    handleUpdateUser({key: "sex", value});
                  },
                }}
              >
                {dataUser.data?.sex}
              </Paragraph>
            </div>

            <div className="flex items-center justify-between">
              <p className="w-1/2 text-sm">Số điện thoại người thân: </p>
              <Paragraph
                className="w-1/2"
                editable={{
                  onChange: (value) => {
                    handleUpdateUser({key: "phoneNumberRelatives", value});
                  },
                }}
              >
                {dataUser.data?.phoneNumberRelatives}
              </Paragraph>
            </div>

            <div className="flex items-center justify-between">
              <p className="w-1/2 text-sm">Mối quan hệ người thân: </p>
              <Paragraph
                className="w-1/2"
                editable={{
                  onChange: (value) => {
                    handleUpdateUser({key: "phoneNumberRelatives", value});
                  },
                }}
              >
                {dataUser.data?.relationship}
              </Paragraph>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3 bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <h4 className="font-semibold">Thông tin tài khoản thụ hưởng</h4>
            <div className="flex items-center justify-between">
              <p className="w-1/3 text-sm">Tên Ngân hàng: </p>
              <Paragraph
                className="w-full pl-3"
                editable={{
                  onChange: (value) => {
                    handleUpdateBank({key: "bankName", value});
                  },
                }}
              >
                {dataUser.data?.bankData?.bankName}
              </Paragraph>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/3 text-sm">Tên chủ thẻ: </p>
              <Paragraph
                className="w-full pl-3"
                editable={{
                  onChange: (value) => {
                    handleUpdateBank({key: "bankUserName", value});
                  },
                }}
              >
                {dataUser.data?.bankData?.bankUserName}
              </Paragraph>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/3 text-sm">Số thẻ: </p>
              <Paragraph
                className="w-full pl-3"
                editable={{
                  onChange: (value) => {
                    handleUpdateBank({key: "bankNumber", value});
                  },
                }}
              >
                {dataUser.data?.bankData?.bankNumber}
              </Paragraph>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3 bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <h4 className="font-semibold">Ảnh trước CMND</h4>
            <Image
              src={dataUser?.data?.cardData?.frontCardImage}
              preview={false}
              alt="CMND"
              className="w-full h-auto"
            />
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Ảnh sau CMND</h4>
            <Image
              preview={false}
              src={dataUser?.data?.cardData?.backCardImage}
              alt="CMND"
              className="w-full h-auto"
            />
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Ảnh chân dung</h4>
            <Image
              preview={false}
              src={dataUser?.data?.cardData?.selfImage}
              alt="CMND"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-4">
        {dataContract?.data?.length > 0 ? (
          <div className="col-span-12 md:col-span-4 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mt-2">
              <p className="w-1/2 text-sm">Số tiền: </p>
              <p className="w-1/2">
                {dataContract?.data?.[0]?.amountMoney
                  ?.toString()
                  ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="w-1/2 text-sm">Trạng thái: </p>
              <p className="w-1/2">{renderStatusContract}</p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="w-1/2 text-sm">Thời hạn: </p>
              <p className="w-1/2">{dataContract.data?.[0]?.duration} tháng</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="w-1/2 text-sm">Mã hợp đồng: </p>
              <p className="w-1/2">{dataContract.data?.[0]?.code}</p>
            </div>
            {dataUser?.data?.walletData && (
              <div className="flex items-center mt-2">
                <p className="w-1/2 text-sm">Rút tiền</p>
                <Switch
                  className="switch"
                  defaultChecked={!dataUser?.data?.walletData?.isError}
                  onChange={handleChangeSwitch}
                />
              </div>
            )}
            {dataUser?.data?.walletData?.isError && (
              <div className="flex items-center mt-2">
                <p className="w-1/2">Lý do từ chối</p>
                <div className="w-1/2 flex items-center">
                  {isInputError ? (
                    <Input
                      value={error}
                      onChange={(e) => setError(e.target.value)}
                    />
                  ) : (
                    <Select
                      defaultValue={dataUser?.data?.walletData?.error}
                      style={{width: "70%"}}
                      value={error}
                      onChange={(value) => setError(value)}
                      options={[
                        {
                          value: "Sai thông tin liên kết ví",
                          label: "Sai thông tin liên kết ví",
                        },
                        {
                          value: "Rút tiền sai phạm hợp đồng vay",
                          label: "Rút tiền sai phạm hợp đồng vay",
                        },
                        {value: "Đóng băng cờ bạc", label: "Đóng băng cờ bạc"},
                        {
                          value: "Điểm tín dụng chưa đủ",
                          label: "Điểm tín dụng chưa đủ",
                        },
                        {value: "Hồ sơ bất cập", label: "Hồ sơ bất cập"},
                        {
                          value: "Đóng băng khoản vay",
                          label: "Đóng băng khoản vay",
                        },
                        {
                          value: "Cấp mã OTP thất bại!",
                          label: "Cấp mã OTP thất bại!",
                        },
                      ]}
                    />
                  )}
                  <Button onClick={() => setIsInputError(!isInputError)}>
                    Khác
                  </Button>
                </div>
              </div>
            )}
            <div className="flex items-center justify-end mt-2">
              {dataContract?.data?.[1]?.status === "pendding" && (
                <Button
                  onClick={handleApproveContract}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mx-4"
                >
                  Duyệt hợp đồng
                </Button>
              )}
              <Button type="primary" onClick={handleOkError}>
                Cập nhật
              </Button>
            </div>
          </div>
        ) : (
          <div className="col-span-12 md:col-span-4 bg-white p-4 rounded-lg shadow">
            <p>Hiện không có yêu cầu</p>
          </div>
        )}

        <div className="col-span-12 md:col-span-4 bg-white p-4 rounded-lg shadow">
          {dataRequest?.data?.records?.length ? (
            <div>
              <p className="font-semibold text-center">Yêu cầu rút tiền</p>
              <div className="flex items-center justify-between mt-2">
                <p className="w-1/2 text-sm font-bold">Ngân hàng: </p>
                <p className="w-full">{dataUser?.data?.bankData?.bankName}</p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <p className="w-1/2 text-sm font-bold">Số tài khoản: </p>
                <p className="w-full">{dataUser?.data?.bankData?.bankNumber}</p>
              </div>
              <p className="w-1/3 mt-2 font-bold">Lệnh rút tiền: </p>
              {dataRequest?.data?.records?.map((item: any, index: any) => (
                <div className="flex mt-2 items-center" key={index}>
                  <div className="w1/2 pr-4">
                    {moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                  </div>
                  <div className="w-1/2 pl-4">
                    Lệnh rút{" "}
                    {item.balance
                      ?.toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                    vnđ
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Hiện không có yêu cầu</p>
          )}
        </div>
        <div className="col-span-12 md:col-span-4 bg-white p-4 rounded-lg shadow">
          <p className="font-semibold text-center">Ví người dùng</p>
          <div className="flex mt-2">
            <p>Số dư</p>
            <p className="flex-1 text-center font-semibold">
              {dataUser?.data?.walletData?.balance
                ?.toString()
                ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
              VND
            </p>
          </div>
          <div className="flex justify-between mt-2 mx-20">
            <Button
              type="dashed"
              className=" px-4 py-1 rounded"
              onClick={() => {
                toggleModal(1);
              }}
            >
              Trừ ví
            </Button>
            <Button
              type="dashed"
              className=" px-4 py-1 rounded"
              onClick={() => toggleModal(2)}
            >
              Cộng ví
            </Button>
          </div>
          <div className="font-bold my-1">Lịch sử</div>
          {dataLogWallet.data?.map((item: any) => (
            <div key={item?.id} className="flex items-center justify-between">
              <div>{moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}</div>
              <div>{item?.message ?? "Không ghi chú"}</div>
              <div>
                {item.type === "add" ? `+${item?.number}` : `-${item?.number}`}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalWallet
        type={type}
        openModalWallet={openModalWallet}
        toggleModal={toggleModal}
        wallet={dataUser?.data?.walletData}
        onCallback={dataUser?.refetch}
      />
    </div>
  );
}
