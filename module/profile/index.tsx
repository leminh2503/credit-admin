import React, {useState} from "react";
import {Button, Image, Input, Modal, Row, Switch, Tag} from "antd";

export function Profile() {
  const [openModalWallet, setOpenModalWallet] = useState(false);
  const [type, setType] = useState(1);
  const toggleModal = (tp?: number) => {
    setType(tp);
    setOpenModalWallet(!openModalWallet);
  };

  const handleOk = () => {};
  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="text-center mb-4">
            <Tag
              className="my-4 text-green-500"
              style={{marginInlineEnd: 0}}
              color="green"
            >
              Đã xác minh
            </Tag>
            <Image
              src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
              alt="User"
              width={150}
              height={150}
              className="mx-auto rounded-full"
            />
          </div>
          <div className="text-center mb-2">
            <p className="font-bold">0378555222</p>
            <p className="font-bold">nguyen a</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <p className="w-1/2">Số CMND: </p>
              <p className="w-1/2">12398765432 </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Ngày sinh: </p>
              <p className="w-1/2">06/11/1995</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Địa chỉ: </p>
              <p className="w-1/2">aaa </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Nghề nghiệp: </p>
              <p className="w-1/2">ss </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Thu nhập: </p>
              <p className="w-1/2">11111 </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Mục đích vay: </p>
              <p className="w-1/2">tiêu </p>
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
              <p className="w-1/2">ABBank</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Tên chủ thẻ: </p>
              <p className="w-1/2">anh em</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-1/2">Số thẻ: </p>
              <p className="w-1/2">11111111</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3 bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <h4 className="font-semibold">Ảnh trước CMND</h4>
            <img
              src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
              alt="CMND"
              className="w-full h-auto"
            />
            <div className="flex justify-between mt-2">
              <button className="bg-gray-300 px-4 py-1 rounded">Trước</button>
              <button className="bg-gray-300 px-4 py-1 rounded">Sau</button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 md:col-span-4 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mt-2">
            <p className="w-1/2">Số tiền: </p>
            <p className="w-1/2">50,000,000</p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="w-1/2">Trạng thái: </p>
            <p className="w-1/2">Đã duyệt</p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="w-1/2">Thời hạn: </p>
            <p className="w-1/2">12 tháng</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="w-1/2">Mã hợp đồng: </p>
            <p className="w-1/2">08712218</p>
          </div>
          <div className="flex items-center mt-2">
            <p className="w-1/2">Rút tiền</p>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center mt-2">
            <p className="w-1/2">OTP</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Xem hợp đồng
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Cập nhật
            </button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 bg-white p-4 rounded-lg shadow">
          <p>Hiện không có yêu cầu</p>
        </div>
        <div className="col-span-12 md:col-span-4 bg-white p-4 rounded-lg shadow">
          <p className="font-semibold text-center">Ví người dùng</p>
          <div className="flex mt-2">
            <p>Số dư</p>
            <p className="flex-1 text-center font-semibold">150,000,000 VND</p>
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
          <p className="mt-2">Lịch sử:</p>
          <p className="mt-2">
            29/06/2024 20:03:37: Hồ sơ vay được chấp thuận. +50,000,000
          </p>
          <p className="mt-2">Không ghi chú: +100,000,000</p>
        </div>
      </div>

      <Modal
        title={type === 1 ? "Trừ tiền từ ví khách" : "Cộng tiền vào ví khách"}
        open={openModalWallet}
        onOk={handleOk}
        onCancel={() => toggleModal()}
      >
        <Input className="mt-4" size="large" placeholder="Nhập số tiền vay" />
        <Input className="mt-4" size="large" placeholder="Nhập lý do" />
      </Modal>
    </div>
  );
}
