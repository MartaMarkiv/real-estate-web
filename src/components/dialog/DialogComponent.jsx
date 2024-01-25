import { useState, useRef, useEffect } from "react";
import "./styles.scss";
// import InputComponent from "../input/InputComponent";
import ButtonComponent from "../button/ButtonComponent";
import { Form, Input } from "antd";
import Avatar from "antd/es/avatar/avatar";
import { LeftOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";
import { sendUserMessage } from "../../api/requests";
import showNotification from "../../utils/showNotification";

const cookies = new Cookies();

function DialogComponent({data, user, closeDialog, hasUpdates}) {

  // eslint-disable-next-line no-unused-vars
  const bottomRef = useRef(null)

  const [message, setMessage] = useState("");

  const changeMessage = (e) => {
    setMessage(e.target.value);
  }

  const sendMessage = () => {
    if (!message) return;
    console.log("send message: ", message);
    const email = cookies.get("userEstateEmail");
    sendUserMessage(email, data.userId, message, resp => {
      console.log("RESULT SEND MESSAGE");
      console.log(resp);
      if (resp.success) {
        setMessage("");
        scrollToBottom();
        form.resetFields();
      } else {
        showNotification("error", resp.error);
      }
    })
  }

  const scrollToBottom = () => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    console.log("USE EFFECT");
    scrollToBottom();
    form?.resetFields();
  }, [hasUpdates]);
  
  

  let prevDate = "";
  return (
    <section className="dialogWrapper">
      <div className="header">
        <LeftOutlined onClick={()=>closeDialog(true)}/>
        <span className="name">{user}</span>
      </div>
      <div className="massagesWrapper">
        {
          data?.messages.map((item, index) => {
            const currentDate = item.date;
            const showDate = currentDate !== prevDate;
            prevDate = item.date;
            return(<div key={item.id}>
              {showDate && <div className="date"><span>{currentDate}</span></div>}
              <div
                className={"message " + (item.response_email ? "adminMessage" : "")}
                key={item.id}
              >
               
                <Avatar>{item.name_surname[0]}</Avatar>
                <span className="messageText">
                  <span>{item.action}</span>
                  <span className="time">{item.time}</span>
                  {index === data.messages.length - 1 && <span ref={bottomRef} className="reference" />}
                </span>
              </div>
            </div>)
          })
        }
      </div>
        <Form
          className="formWrapper"
          name={`${data.userId}Form`}
          layout="horisontal"
          form={form}
          onSubmitCapture={sendMessage}
          autoComplete="off"
        >
          <Form.Item
            label="Message"
            name="message"
          >
            <Input onChange={changeMessage} placeholder="Message"/>
          </Form.Item>
          <Form.Item>
          <ButtonComponent
            text="Send"
            typeButton="submit"
            disabled={!message}
          />
                </Form.Item>
        </Form>
      {/* </div> */}
    </section>
    )
}

export default DialogComponent;