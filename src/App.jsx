import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.scss";
import Main from "./pages/mainPage/MainPage";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = cookies.get("userEstateToken");
    console.log("APP token: ", userToken);
    
    if (!userToken) { console.log("not token");
      navigate("/login"); 
    }
  }, []);
  

  return (
    <section className="content">
      <header>Dubai Real Estate</header>
      <Main />
    </section>
  );
}

export default App;
