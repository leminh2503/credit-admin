import * as Yup from "yup";
import {SchemaOf} from "yup";

export interface ILoginForm {
  email: string;
  password: string;
}

export function getValidationSchema(): SchemaOf<ILoginForm> {
  return Yup.object().shape({
    email: Yup.string()
      .email("common_validation.email_is_not")
      .max(255, "common_validation.email_longer")
      .required("common_validation.email_empty"),
    password: Yup.string()
      .min(8, "common_validation.pass_shorter")
      .max(50, "common_validation.pass_longer")
      .required("common_validation.pass_empty"),
  });
}
