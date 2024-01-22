import { useState } from "react";
import "./styles.scss";
import InputComponent from "../input/InputComponent";
import ButtonComponent from "../button/ButtonComponent";
import Avatar from "antd/es/avatar/avatar";

function DialogComponent({data}) {

  const [message, setMessage] = useState("");

  const changeMessage = (e) => {
    setMessage(e.target.value);
  }

  const sendMessage = () => {
    console.log("send message: ", message);
  }
  
  return (
    <section className="dialogWrapper">
      <div className="massagesWrapper">
        {
          data.messages.map(item => {
            return(<div
              className={"message " + (item.response_email ? "adminMessage" : "")}
              key={item.id}
            >
              <Avatar>{item.name_surname[0]}</Avatar>
              <span className="messageText">{item.action}</span>
            </div>)
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