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
  address?: string;
};

export function Settings(): JSX.Element {
  const router = useRouter();
  const _formRef = useRef<any>(undefined);
  const [initValues, setInitValue] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dataSetting = useQuery("Settings", () => ApiUser.getSettings(), {
    onSuccess: (res) => {
      setInitValue({
        linkSupport: res.linkSupport,
        phoneNumber: res.phoneNumber,
        address: res.address,
        linkFB: res?.linkFB,
      });
      _formRef.current?.setFieldValue("linkSupport", res.linkSupport);
      _formRef.current?.setFieldValue("phoneNumber", res.phoneNumber);
      _formRef.current?.setFieldValue("address", res.address);
      _formRef.current?.setFieldValue("linkFB", res?.linkFB);
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
      ref={_formRef}
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
        name="phoneNumber"
        rules={[{required: true, message: "Nhập số điện thoại CSKH!"}]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Liên kết CSKH"
        name="linkSupport"
        rules={[{required: true, message: "Nhập liên kết CSKH!"}]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Link hỗ trợ facebook"
        name="linkFB"
        rules={[{required: true, message: "Nhập liên kết facebook!"}]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Địa chỉ"
        name="address"
        rules={[{required: true, message: "Nhập địa chỉ!"}]}
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
