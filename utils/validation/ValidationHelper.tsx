import {notification} from "antd";

const checkValidFormData = (
  data,
  requiredField,
  options = {notification: true}
): boolean => {
  const message = [];

  requiredField.forEach((rq) => {
    if (!data[rq.key]) {
      message.push(rq);
    }
  });

  if (options.notification) {
    if (message.length) {
      notification.error({
        message: "Các trường không được để trống",
        description: message.map((dt) => dt.label).join(", "),
      });
    }
  }
  return !message.length;
};

export default {
  checkValidFormData,
};
