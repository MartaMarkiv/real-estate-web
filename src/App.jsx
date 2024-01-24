import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.scss";
import Main from "./pages/mainPage/MainPage";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { LogoutOutlined } from "@ant-design/icons";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = cookies.get("userEstateToken");
    
    if (!userToken) { console.log("not token");
      navigate("/login"); 
    }
  }, []);

  const logout = () => {
    cookies.remove("userEstateToken");
    cookies.remove("userEstateEmail");
    navigate("/login"); 
  }

  return (
    <section className="content">
      <header>
        <span>Dubai Real Estate</span>
        <LogoutOutlined onClick={logout}/>
      </header>
      <Main />
    </section>
  );
}

export default App;
