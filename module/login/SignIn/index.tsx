import "./index.scss";
import {Formik} from "formik";
import {Form, Input} from "antd";
import {ButtonSubmit} from "@app/components/ButtonSubmit";
import {useRouter} from "next/router";
import Config from "@app/config";
import {getValidationSchema} from "@app/module/login/NewPassword/form-config";

export function SignIn(): JSX.Element {
  const router = useRouter();

  const handleLogin = (): void => {
    router.push(Config.PATHNAME.HOME);
  };
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
              <div className="login-text">
                Nhập tài khoản và mật khẩu để đăng nhập
              </div>
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

            <ButtonSubmit
              label="Đăng nhập"
              isSubmitting={isSubmitting}
              classRow="pt-20"
              handleClick={handleLogin}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
