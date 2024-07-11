import "./index.scss";
import {Button, Form, FormProps, Input, notification} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import ApiUser from "@app/api/ApiUser";
import Config from "@app/config";
import {useMutation, useQuery} from "react-query";

type FieldType = {
  linkSupport?: string;
  phoneNumber?: string;
};

export function Settings(): JSX.Element {
  const router = useRouter();
  const [initValues, setInitValue] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dataSetting = useQuery("Settings", () => ApiUser.getSettings(), {
    onSuccess: (res) => {
      setInitValue({
        linkSupport: res.linkSupport,
        phoneNumber: res.phoneNumber,
      });
    },
  });

  const updateSettingMutation = useMutation(ApiUser.updateSettings);

  useEffect(() => {
    if (!ApiUser.isLogin()) {
      router.push(Config.PATHNAME.LOGIN);
    }
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    updateSettingMutation.mutate(values, {
      onSuccess: () => {
        notification.success({
          duration: 3,
          message: "Update Success",
        });
      },
    });
  };

  return (
    <Form
      name="basic"
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      initialValues={initValues}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Số điện thoại CSKH"
        name="linkSupport"
        rules={[{required: true, message: "Nhập số điện thoại CSKH!"}]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Liên kết CSKH"
        name="phoneNumber"
        rules={[{required: true, message: "Nhập liên kết CSKH!"}]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button type="primary" htmlType="submit">
          Lưu thông tin
        </Button>
      </Form.Item>
    </Form>
  );
}
