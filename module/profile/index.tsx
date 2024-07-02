import React from "react";

export function Profile() {
  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3 bg-white p-4 rounded-lg shadow">
          <div className="text-center mb-4">
            <img
              src="https://via.placeholder.com/100"
              alt="User"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <div className="mt-2 text-green-500">Đã xác minh</div>
          </div>
          <div className="text-center mb-2">
            <p>0378555222</p>
            <p>nguyen a</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <p>Số CMND: 0777777</p>
            <p>Ngày sinh: 06/11/1995</p>
            <p>Địa chỉ: aaa</p>
            <p>Nghề nghiệp: ss</p>
            <p>Thu nhập: 11111</p>
            <p>Mục đích vay: tiêu</p>
            <p>Thời gian gọi: Thời gian nhận cuộc gọi bất cứ lúc nào</p>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Thông tin người liên hệ 1</h4>
            <p>Họ tên: nguyen e</p>
            <p>Số điện thoại: 0978123222</p>
            <p>Quan hệ người vay: anh em</p>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Thông tin người liên hệ 2</h4>
            <p>Họ tên: amjh</p>
            <p>Số điện thoại: 0912888122</p>
            <p>Quan hệ người vay: anh em</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <h4 className="font-semibold">Thông tin tài khoản thụ hưởng</h4>
            <p>Tên Ngân hàng: ACB</p>
            <p>Tên chủ thẻ: aa</p>
            <p>Số thẻ: 11111111</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <h4 className="font-semibold">Ảnh trước CMND</h4>
            <img
              src="https://via.placeholder.com/100"
              alt="CMND"
              className="w-full h-auto"
            />
            <div className="flex justify-between mt-2">
              <button className="bg-gray-300 px-4 py-1 rounded">Trước</button>
              <button className="bg-gray-300 px-4 py-1 rounded">Sau</button>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-12 bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-3">
              <p>Số tiền: 50,000,000</p>
              <p>Trạng thái: Đã duyệt</p>
              <p>Thời hạn: 12 tháng</p>
              <p>Mã hợp đồng: 08712218</p>
              <p>
                Rút tiền: <input type="checkbox" className="toggle-checkbox" />
              </p>
              <p>
                OTP:{" "}
                <span className="text-blue-500 cursor-pointer">Nhập OTP</span>
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Xem hợp đồng
              </button>
            </div>
            <div className="col-span-12 md:col-span-3">
              <p>Hiện không có yêu cầu</p>
            </div>
            <div className="col-span-12 md:col-span-3">
              <p>Ví người dùng</p>
              <p>Số dư: 150,000,000 VND</p>
              <div className="flex justify-between">
                <button className="bg-gray-300 px-4 py-1 rounded">
                  Trừ ví
                </button>
                <button className="bg-gray-300 px-4 py-1 rounded">
                  Cộng ví
                </button>
              </div>
              <p>Lịch sử:</p>
              <p>29/06/2024 20:03:37: Hồ sơ vay được chấp thuận. +50,000,000</p>
              <p>Không ghi chú: +100,000,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
