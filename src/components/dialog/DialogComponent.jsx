import { useState } from "react";
import "./styles.scss";
import InputComponent from "../input/InputComponent";
import ButtonComponent from "../button/ButtonComponent";

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
      { data.imageUrl && <div>
        <img className="image" src={data.imageUrl} alt="Image"/></div>}
        <div><span className="descr">Author:</span> <span>{data.author}</span></div>
        <div><span className="descr">Title:</span> <span>{data.title}</span></div>
        <div><a href={data.url}>Click to open article</a></div>
      </div>
      <div className="formWrapper">
        <InputComponent
          typeInput="text"
          placeholder="Enter message"
          changeValue={changeMessage}
          textValue={message}
        />
        <ButtonComponent text="Send" sendAction={sendMessage}/>
      </div>
    </section>
    )
}

export default DialogComponent;