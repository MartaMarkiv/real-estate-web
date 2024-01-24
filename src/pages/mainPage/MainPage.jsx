import { useState, useEffect } from "react";
import { w3cwebsocket as WebSocket } from "websocket";
import { useNavigate } from "react-router-dom";
// import api from "../../api/api";
import "./styles.scss";
import DialogComponent from "../../components/dialog/DialogComponent";
import DialogItem from "../../components/dialogItem/DialogItem";
import { parser } from "../../utils/parser";
import Cookies from "universal-cookie";
import { Flex, Spin } from "antd";
// eslint-disable-next-line no-unused-vars
import mockedData from "../../mockedData.json";

const cookies = new Cookies();

const socketConn = "ws://@185.107.237.254:8000/ws/client_history";

function Main() {
  const userToken = cookies.get("userEstateToken");

  const [dataTable, setDataTable] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadingDialogs, setLoadingDialogs] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [messagesData, setMessagesData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [errorConnection, setErrorConnection] = useState(false);
  const [visible, setVisible] = useState(true);

  const navigate = useNavigate();

  const client = new WebSocket(`${socketConn}?token=${userToken}`);
  const connectSocket = () => {

    client.onmessage = (event) => {
      setLoadingDialogs(false);

      console.log("ON MESSAGE");
      console.log(event.data);
      
      const json = JSON.parse(event.data);
      if (!json.success && json.message && userToken) {
        // openNotification(json.message);
        if (json.message === "Expired token" ||
          json.message === "Unauthorized user" ||
          json.message === "User is blocked"
        ) {
          cookies.remove("userEstateToken");
          navigate("/", { replace: true});
        }
      }
      
      const parsedData = parser(json);
      setDataTable(parsedData);
    };

    client.onerror = () => {
      console.log("Socket connection error");
      setErrorConnection(true);
      setLoadingDialogs(false);
    };
  };

  useEffect(() => {
    connectSocket();
  }, []);


  // useEffect(() => {
  //   const {dialogs: data} = mockedData;
  //   setDataTable(parser(data));
  // }, []);

  const selectDialog = (value) => {
    setVisible(false);
    setSelectedItem(value);
  }


  return( loadingDialogs ? <Flex align="center" justify="center">
    <Spin size="large" fullscreen={true} tip="Loading"/>
  </Flex> :
  <>
  {
    // errorConnection ? <div
    //   className="errorConnection"
    // >
    //   Socket error connection. Please, try again later.
    // </div> :
      <section className={"mainContent " + (visible ? "visible" : "")}>
        <section className="listContainer">
          {
            dataTable?.map((item) => {
              return <DialogItem
                key={item.userId}
                item={item}
                changeSelected={selectDialog}
                selectedItem={selectedItem}
              />
            })
          }
        </section>
        <section className="dialogContainer">
        {
          selectedItem ? 
          <DialogComponent
            data={selectedItem}
            user={selectedItem && selectedItem.userName}
            closeDialog={setVisible}
          />:
          <div className="noArticle">Choose dialog to display details.</div>
        }
      </section>
    </section>
  }
  </>
  );
}

export default Main;