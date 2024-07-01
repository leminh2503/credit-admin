import "./index.scss";
import {Formik} from "formik";
import {Form, Image, Row, Input, Col} from "antd";
import {ButtonSubmit} from "@app/components/ButtonSubmit";
import {useMutation} from "react-query";
import ApiUser from "@app/api/ApiUser";
import {useDispatch} from "react-redux";
import {loginUser} from "@app/redux/slices/UserSlice";
import {useRouter} from "next/router";
import Config from "@app/config";
import {IAccountInfo} from "@app/types";
import {
  getValidationSchema,
  ILoginForm,
} from "@app/module/login/NewPassword/form-config";

interface SignInProps {
  changeTab: (tab: string) => void;
}
export function SignIn({changeTab}: SignInProps): JSX.Element {
  const dispatch = useDispatch();

  const router = useRouter();

  const loginMutation = useMutation(ApiUser.login);

  const handleLogin = (): void => {
    console.log("12312312----");
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
              <Image
                className="login-image"
                src="img/eximbank-logo.jpeg"
                preview={false}
              />
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

            <Row
              role="button"
              tabIndex={0}
              className="forgot-pass pt-20"
              onClick={(): void => changeTab("signUp")}
            >
              <div>Chưa có tài khoản? </div>
              <div>Đăng Ký</div>
            </Row>
            <Image src="img/congthuong.png" width={100} className="mt-2" />
            <Col>
              <h3>EXIMBANK</h3>
              <div>
                <b>Địa chỉ:</b>
                <span>
                  Tầng 8 - Vincom Center, 72 Lê Thánh Tôn và 45A Lý Tự Trọng,
                  P.Bến Nghé, Q.1, TP.HCM
                </span>
              </div>
              <div>® Bản quyền thuộc về Eximbank</div>
            </Col>
            <Image src="img/vayvon.jpg" width="100%" className="mt-4" />
          </Form>
        </div>
      )}
    </Formik>
  );
}
