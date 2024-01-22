import "./styles.scss";
import { Avatar, Badge, Space } from "antd";

function DialogItem({changeSelected, item, selectedItem}) {
  return(<div onClick={()=>changeSelected(item)}
    className={"item " + (selectedItem && selectedItem.userId === item.userId ? "selected" : "")}>
      <Space size={26}>
        <Badge count={item.hasNotification}>
          <Avatar size={38}>{item.userName[0]}</Avatar>
        </Badge>
      </Space>
      <div className="details">
        <div className="name">{item.userName}</div>
      </div>
    </div>);
}

export default DialogItem;