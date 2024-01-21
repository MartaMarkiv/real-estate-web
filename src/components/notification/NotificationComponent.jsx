import "./styles.scss";
// import { ExclamationOutlined } from "@ant-design/icons";

function NotificationComponent({count}) {
  return(<span className="notification">
    {/* <ExclamationOutlined /> */}
    {count}
  </span>)
}

export default NotificationComponent;