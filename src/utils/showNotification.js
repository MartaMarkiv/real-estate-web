import { notification } from "antd";

const showNotification = (type, description) => notification[type]({
  description,
  placement: "bottom"
});

export default showNotification;