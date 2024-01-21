import { useState } from "react";
import "./styles.scss";
import InputComponent from "../input/InputComponent";
import ButtonComponent from "../button/ButtonComponent";

function DialogComponent({data}) {

  console.log("SELECTED");
  console.log(data);

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
              {/* {item.response_email && <span>admin: </span>} */}
              {item.action}
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