import "./styles.scss";
import NotificationComponent from "../notification/NotificationComponent";

function DialogItem({changeSelected, item, selectedItem}) {
  console.log("item.hasNotification: ", item.hasNotification, "  ", !!item.hasNotification);
  return(<div onClick={()=>changeSelected(item)}
    className={"item " + (selectedItem && selectedItem.userId === item.userId ? "selected" : "")}>
      <div className="image">
        {
          item.imageUrl ?
          <img src={item.imageUrl} alt="Image"/>:
          <span>No image</span>
        }
      </div>
      <div className="details">
        <div className="name">{item.userId}</div>
        <div className="titleArticle">{item.title}</div>
        {!!item.hasNotification && <NotificationComponent count={item.hasNotification} />}
      </div>
    </div>);
}

export default DialogItem;