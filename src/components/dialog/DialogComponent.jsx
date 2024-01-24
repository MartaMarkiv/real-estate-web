import { useState } from "react";
import "./styles.scss";
import InputComponent from "../input/InputComponent";
import ButtonComponent from "../button/ButtonComponent";
import Avatar from "antd/es/avatar/avatar";
import { LeftOutlined } from "@ant-design/icons";

function DialogComponent({data, user, closeDialog}) {

  const [message, setMessage] = useState("");

  const changeMessage = (e) => {
    setMessage(e.target.value);
  }

  const sendMessage = () => {
    console.log("send message: ", message);
  }
  
  console.log(data.messages);

  let prevDate = "";
  return (
    <section className="dialogWrapper">
      <div className="header">
        <LeftOutlined onClick={()=>closeDialog(true)}/>
        <span className="name">{user}</span>
      </div>
      <div className="massagesWrapper">
        {
          data.messages.map(item => {
            const currentDate = item.date;
            const showDate = currentDate !== prevDate;
            prevDate = item.date;
            return(<>
              {showDate && <div className="date"><span>{currentDate}</span></div>}
              <div
                className={"message " + (item.response_email ? "adminMessage" : "")}
                key={item.id}
              >
                <Avatar>{item.name_surname[0]}</Avatar>
                <span className="messageText">
                  <span>{item.action}</span>
                  <span className="time">{item.time}</span>
                </span>
              </div>
            </>)
          })
        }
      </div>
      <div className="formWrapper">
        <InputComponent
          typeInput="text"
          placeholder="Enter message"
          changeValue={changeMessage}
          textValue={message}
        />
        <ButtonComponent text="Send" sendAction={sendMessage} disabled={!message}/>
      </div>
    </section>
    )
}

export default DialogComponent;