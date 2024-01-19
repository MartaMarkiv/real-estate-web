import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import SubmitButton from "../../components/submitButton/SubmitButton";
import { Form, Input } from "antd";
import { loginRequest } from "../../api/requests";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function LoginPage() {
  const navigate = useNavigate();

  const token = cookies.get("userEstateToken");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userToken, setUserToken] = useState(token);

  useEffect(() => {
    if (userToken) {
      navigate("/"); 
    }
  }, [userToken]);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Submit form");
    console.log(email);
    console.log(password);
    // eslint-disable-next-line no-unused-vars
    loginRequest(email, password, data => {
      console.log("login req ", data);
      if (data.success) {
        console.log("data success");
        cookies.set("userEstateToken", data.token, { path: "/" });
        setUserToken(data.token);

      } else {
        setErrorMessage(data.message || data.error);
          setTimeout(() => setErrorMessage(null), 3000);
      }
  });
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const [form] = Form.useForm();

  return(<section className="loginPage">
    <Form
      className="loginFormWrapper"
      name="basic"
      layout="vertical"
      form={form}
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
      {errorMessage && <div className="error">{errorMessage}</div>}

      <Form.Item>
        <SubmitButton form={form}/>
      </Form.Item>
    </Form>
  </section>)
}

export default LoginPage;