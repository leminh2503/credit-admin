import "./index.scss";
import {Formik} from "formik";
import {getValidationSchema} from "@module/login/NewPassword/form-config";
import {Col, Form, Image, Input, Row} from "antd";
import {ButtonSubmit} from "@components/ButtonSubmit";

export function SignUp({changeTab}: any): JSX.Element {
  const handleLogin = () => {};

  return (
    <Formik
      initialValues={{email: "", password: ""}}
      validateOnChange={false}
      validateOnBlur
      validationSchema={getValidationSchema()}
      onSubmit={handleLogin}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
      }): JSX.Element => (
        <div className="container-sign-in">
          <Form onFinish={handleSubmit} className="container-sign-in">
            <div className="header-wrapper">
              <Image
                className="login-image"
                src="img/eximbank-logo.jpeg"
                preview={false}
              />
            </div>
            <Input
              name="email"
              className="mt-4"
              placeholder="Nhập tài khoản"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Input.Password
              className="mt-4"
              name="password"
              placeholder="Nhập mật khẩu"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Input.Password
              className="mt-4"
              name="password"
              placeholder="Nhập lại mật khẩu"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="policy mt-4">
              <span className="ant-checkbox-wrapper">
                <span className="ant-checkbox">
                  <input
                    type="checkbox"
                    className="ant-checkbox-input"
                    value=""
                  />
                </span>
                <span className="mx-1">Đồng ý với </span>
              </span>
              <span className="policy-text">điều khoản dịch vụ</span>
            </div>

            <ButtonSubmit label="Đăng Ký" isSubmitting={isSubmitting} />
            <Image src="img/congthuong.png" width={100} className="mt-2" />
            <Col>
              <div>Độ dài mật khẩu từ 6-20 ký tự</div>
              <div>Ví dụ:</div>
              <div>Mật khẩu: 123456</div>
            </Col>
            <Row
              role="button"
              tabIndex={0}
              className="forgot-pass pt-20"
              onClick={(): void => changeTab("signIn")}
            >
              <div>Đã có tài khoản? </div>
              <div>Đăng nhập</div>
            </Row>
          </Form>
        </div>
      )}
    </Formik>
  );
}
