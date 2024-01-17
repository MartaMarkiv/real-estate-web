import { useState } from "react";
import "./styles.scss";
import ButtonComponent from "../../components/button/ButtonComponent";
import InputComponent from "../../components/input/InputComponent";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Submit form");
    console.log(email);
    console.log(password);
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  return(<section className="loginPage">
    <form className="loginFormWrapper" onSubmit={submitForm}>
      <div className="loginHeader">Login</div>
      <label htmlFor="loginEmail">Enter email</label>
      <InputComponent
        textValue={email}
        typeInput="email"
        changeValue={changeEmail}
        id="loginEmail"
      />
      <label htmlFor="loginPassword">Enter password</label>
      <InputComponent
        textValue={password}
        typeInput="password"
        changeValue={changePassword}
        id="loginPassword"
      />
      <ButtonComponent text="Sign in" typeButton="submit" sendAction={submitForm}/>
    </form>
  </section>)
}

export default LoginPage;