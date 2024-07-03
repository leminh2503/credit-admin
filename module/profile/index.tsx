import React, {useMemo, useState} from "react";
import {Button, Image, Input, Modal, notification, Switch, Tag} from "antd";
import {useRouter} from "next/router";
import {useMutation, useQuery} from "react-query";
import ApiUser from "@api/ApiUser";

export function Profile() {
  const [openModalWallet, setOpenModalWallet] = useState(false);
  const [type, setType] = useState(1);
  const {query} = useRouter();
  const [balance, setBalance] = useState("");

  const dataUser = useQuery(
    ["dataUser", query],
    () => ApiUser.getDetailUser(query?.id as any),
    {
      enabled: !!query?.id,
    }
  );

  const dataContract = useQuery(
    ["dataContract", query],
    () => ApiUser.getContractByUserId(query?.id as any),
    {
      enabled: !!query?.id,
    }
  );

  const confirmMutation = useMutation(ApiUser.confirmProfile);
  const updateWalletMutation = useMutation(ApiUser.updateWallet);
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

  const handleOk = () => {
    if (type === 1) {
      updateWalletMutation.mutate(
        {
          id: dataUser?.data?.walletData?.id,
          balance: dataUser.data?.walletData?.balance
            ? // eslint-disable-next-line no-unsafe-optional-chaining
              dataUser.data?.walletData?.balance - Number(balance)
            : Number(balance),
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Trừ tiền thành công",
              duration: 3,
            });
            setBalance("");
            dataUser.refetch();
            toggleModal();
          },
        }
      );
    } else {
      updateWalletMutation.mutate(
        {
          id: dataUser?.data?.walletData?.id,
          balance: dataUser.data?.walletData?.balance
            ? // eslint-disable-next-line no-unsafe-optional-chaining
              dataUser.data?.walletData?.balance + Number(balance)
            : Number(balance),
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Cộng tiền thành công",
              duration: 3,
            });
            dataUser.refetch();
            setBalance("");
            toggleModal();
          },
        }
      );
    }
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

  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="text-center mb-4">
            {renderStatus}
            <Image
              src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
              alt="User"
              width={150}
              height={150}
              preview={false}
              className="mx-auto rounded-full"
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

        <div className="col-span-12 md:col-span-5 bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <p className="w-1/2">Số CMND: </p>
              <p className="w-1/2">{dataUser.data?.cccd}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Ngày sinh: </p>
              <p className="w-1/2">{dataUser.data?.dateOfBith}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Địa chỉ: </p>
              <p className="w-1/2">aaa </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Nghề nghiệp: </p>
              <p className="w-1/2">{dataUser.data?.job}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Thu nhập: </p>
              <p className="w-1/2">{dataUser.data?.income} </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Mục đích vay: </p>
              <p className="w-1/2">{dataUser.data?.loanPurpose} </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="w-1/2">Thời gian gọi: </p>
              <p className="w-1/2">Thời gian nhận cuộc gọi bất cứ lúc nào </p>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Thông tin người liên hệ 1</h4>

            <div className="flex items-center justify-between">
              <p className="w-1/2">Họ tên: </p>
              <p className="w-1/2">nguyen e</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="w-1/2">Số điện thoại: </p>
              <p className="w-1/2">0978123222 </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="w-1/2">Quan hệ người vay: </p>
              <p className="w-1/2">anh em</p>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Thông tin người liên hệ 2</h4>

            <div className="flex items-center justify-between">
              <p className="w-1/2">Họ tên: </p>
              <p className="w-1/2">nguyen e</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="w-1/2">Số điện thoại: </p>
              <p className="w-1/2">0978123222 </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="w-1/2">Quan hệ người vay: </p>
              <p className="w-1/2">anh em</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <h4 className="font-semibold">Thông tin tài khoản thụ hưởng</h4>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Tên Ngân hàng: </p>
              <p className="w-1/2">{dataUser.data?.bankData?.bankName}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Tên chủ thẻ: </p>
              <p className="w-1/2">{dataUser.data?.bankData?.bankUserName}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Số thẻ: </p>
              <p className="w-1/2">{dataUser.data?.bankData?.bankNumber}</p>
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
          <div className="col-span-12 md:col-span-6 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mt-2">
              <p className="w-1/2">Số tiền: </p>
              <p className="w-1/2">{dataContract?.data?.[0]?.amountMoney}</p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="w-1/2">Trạng thái: </p>
              <p className="w-1/2">{renderStatusContract}</p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="w-1/2">Thời hạn: </p>
              <p className="w-1/2">{dataContract.data?.[0]?.duration} tháng</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="w-1/2">Mã hợp đồng: </p>
              <p className="w-1/2">{dataContract.data?.[0]?.code}</p>
            </div>
            <div className="flex items-center mt-2">
              <p className="w-1/2">Rút tiền</p>
              <Switch defaultChecked />
            </div>
            {dataContract?.data?.[1]?.status === "pendding" && (
              <div className="flex items-center justify-between mt-2">
                <Button
                  onClick={handleApproveContract}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Duyệt hợp đồng
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="col-span-12 md:col-span-6 bg-white p-4 rounded-lg shadow">
            <p>Hiện không có yêu cầu</p>
          </div>
        )}
        <div className="col-span-12 md:col-span-6 bg-white p-4 rounded-lg shadow">
          <p className="font-semibold text-center">Ví người dùng</p>
          <div className="flex mt-2">
            <p>Số dư</p>
            <p className="flex-1 text-center font-semibold">
              {dataUser?.data?.walletData?.balance} VND
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
        </div>
      </div>

      <Modal
        title={type === 1 ? "Trừ tiền từ ví khách" : "Cộng tiền vào ví khách"}
        open={openModalWallet}
        onOk={handleOk}
        onCancel={() => toggleModal()}
      >
        <Input
          value={balance}
          onChange={(e) => {
            const valueInput = e.target.value;
            const regex = /^[0-9\b]+$/;
            if (!regex.test(valueInput) && valueInput) {
              return;
            }
            setBalance(e.target.value);
          }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          className="mt-4"
          size="large"
          placeholder="Nhập số tiền"
        />
        <Input className="mt-4" size="large" placeholder="Nhập lý do" />
      </Modal>
    </div>
  );
}
