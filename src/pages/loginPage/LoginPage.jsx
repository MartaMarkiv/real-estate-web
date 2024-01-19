import { useState } from "react";
import "./styles.scss";
import SubmitButton from "../../components/submitButton/SubmitButton";
import { Form, Input } from "antd";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Submit form");
    console.log(email);
    console.log(password);
    // eslint-disable-next-line no-unused-vars
    const promiseA = new Promise((resolve, reject) => {
      
      setTimeout(()=> {
        console.log("Success");
        resolve(777);
      }, 3000);
    });
    
    promiseA.then((val) => console.log("asynchronous logging has val:", val));
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();

  return(<section className="loginPage">
    <Form
      className="loginFormWrapper"
      name="basic"
      layout="vertical"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onSubmitCapture={submitForm}
      autoComplete="off"
    >
      <div className="loginHeader">Login to Emirate real estate</div>
      <Form.Item
        label="Email"
        name="email"
        rules={
          [
            { required: true, message: "Email is required!" },
            { type: "email", message: "Please, enter a valid email" }
          ]
        }
      >
        <Input onChange={changeEmail}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password onChange={changePassword}/>
      </Form.Item>

      <Form.Item>
        <SubmitButton form={form}/>
      </Form.Item>
    </Form>
  </section>)
}

export default LoginPage;