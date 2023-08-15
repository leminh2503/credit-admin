import "./index.scss";
import {Formik} from "formik";
import {Form, Image, Row, Input} from "antd";
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
import FormItem from "@app/components/FormItem";

interface SignInProps {
  changeTab: (tab: string) => void;
}
export function SignIn({changeTab}: SignInProps): JSX.Element {
  const dispatch = useDispatch();

  const router = useRouter();

  const loginMutation = useMutation(ApiUser.login);

  const handleLogin = (
    values: ILoginForm,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}
  ): void => {
    loginMutation.mutate(
      {email: values.email, password: values.password},
      {
        onSuccess: (res: IAccountInfo) => {
          dispatch(loginUser({...res}));
          router.push(Config.PATHNAME.HOME);
          setSubmitting(false);
        },
        onError: () => {
          setSubmitting(false);
        },
      }
    );
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
                src="img/logo.png"
                preview={false}
              />
              <div className="login-text">Đăng nhập</div>
            </div>
            <FormItem name="email" label="Tài khoản" required>
              <Input
                name="email"
                placeholder="Nhập tài khoản"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormItem>
            <FormItem
              className="pt-20"
              name="password"
              label="Mật khẩu"
              required
            >
              <Input.Password
                name="password"
                placeholder="Nhập mật khẩu"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormItem>
            <Row
              role="button"
              tabIndex={0}
              className="forgot-pass pt-20"
              onClick={(): void => changeTab("forgotPassword")}
            >
              Quên mật khẩu?
            </Row>

            <ButtonSubmit
              label="Đăng nhập"
              isSubmitting={isSubmitting}
              classRow="pt-20"
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
