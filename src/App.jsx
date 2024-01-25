import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.scss";
import Main from "./pages/mainPage/MainPage";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { LogoutOutlined } from "@ant-design/icons";
import { logoutRequest } from "./api/requests";
import showNotification from "./utils/showNotification";

function App() {
  const navigate = useNavigate();
  const userToken = cookies.get("userEstateToken");

  useEffect(() => {
    
    if (!userToken) {
      console.log("not token");
      showNotification("warning", "Your session is expired");
      navigate("/login"); 
    }
  }, []);

  const logout = () => {
    logoutRequest(userToken, data => {
      if (data.success) {
        console.log("LOGOUT DATA");
        console.log(data);
        cookies.remove("userEstateToken");
        cookies.remove("userEstateEmail");
        navigate("/login");
      } else {
        console.log(data);
        showNotification("error", data.error);
      }
    }); 
  }

  return (
    <section className="content">
      <header>
        <span>Dubai Real Estate</span>
        <LogoutOutlined onClick={logout}/>
      </header>
      {userToken && <Main />}
    </section>
  );
}

export default App;
