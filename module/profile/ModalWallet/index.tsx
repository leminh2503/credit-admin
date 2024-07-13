import {Input, Modal, notification} from "antd";
import React, {useEffect, useState} from "react";
import {useMutation} from "react-query";
import ApiUser from "@api/ApiUser";

export function ModalWallet({
  type,
  onCallback,
  toggleModal,
  openModalWallet,
  wallet,
}: any) {
  const [balance, setBalance] = useState("");
  const [note, setNote] = useState("");
  const updateWalletMutation = useMutation(ApiUser.updateWallet);

  useEffect(() => {
    setNote("");
    setBalance("");
  }, [openModalWallet]);
  const handleOk = () => {
    if (type === 1) {
      updateWalletMutation.mutate(
        {
          id: wallet?.id,
          number: Number(balance),
          message: note,
          type: "minus",
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Trừ tiền thành công",
              duration: 3,
            });
            setBalance("");
            setNote("");
            onCallback();
            toggleModal();
          },
        }
      );
    } else {
      updateWalletMutation.mutate(
        {
          id: wallet?.id,
          number: Number(balance),
          message: note,
          type: "add",
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Cộng tiền thành công",
              duration: 3,
            });
            onCallback();
            setBalance("");
            setNote("");
            toggleModal();
          },
        }
      );
    }
  };
  return (
    <Modal
      title={type === 1 ? "Trừ tiền từ ví khách" : "Cộng tiền vào ví khách"}
      open={openModalWallet}
      onOk={handleOk}
      onCancel={() => toggleModal()}
    >
      <Input
        value={balance.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        onChange={(e) => {
          const valueInput = e.target.value;
          const regex = /^[0-9\b,]+$/;
          if (!regex.test(valueInput) && valueInput) {
            return;
          }
          setBalance(e.target.value.replaceAll(",", ""));
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
      <Input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="mt-4"
        size="large"
        placeholder="Nhập lý do"
      />
    </Modal>
  );
}
