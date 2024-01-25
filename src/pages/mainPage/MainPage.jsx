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
import { clearNotification } from "../../api/requests";
import showNotification from "../../utils/showNotification";

const cookies = new Cookies();

const socketConn = "ws://@185.107.237.254:8000/ws/client_history";

function Main() {
  const userToken = cookies.get("userEstateToken");
  const client = new WebSocket(`${socketConn}?token=${userToken}`);
  const [dataTable, setDataTable] = useState([]);
  const [allDialogs, setAllDialogs] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadingDialogs, setLoadingDialogs] = useState(true);
  const [errorConnection, setErrorConnection] = useState(false);
  const [visible, setVisible] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

 
  const connectSocket = () => {

    client.onmessage = (event) => {
      console.log("----------- CLIENT ON MESSAGE   --------");
      const json = JSON.parse(event.data);
      if (!json.success && json.message) {
        if (json.message === "Expired token" ||
          json.message === "Unauthorized user"
        ) {
          console.log(json);
          cookies.remove("userEstateToken");
          cookies.remove("userEstateEmail");
          showNotification("warning", "Your session is expired");
          navigate("/login");
          return;
        }
      }

      setLoadingDialogs(false);

      console.log("ON MESSAGE");
      console.log(event.data);
      
      if (json.length === 1) {
        updateDialogs(json);
      } else {
        console.log("NEW DATA");
        const parsedData = parser(json);
        setAllDialogs([...json]);
        setDataTable([...parsedData]);
      }
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

  const clearUnreadMessages = (ids) => {
    clearNotification(ids, data => {
      console.log("clearNotification req ", data);
    });
  };

  const updateDialogs = (json) => {
    console.log("==========json.length === 1");
    let updatedData = [];
    setAllDialogs(prevDialogs => {
      console.log("PREV DIALOGS");
      console.log(prevDialogs);
      updatedData =  [...prevDialogs, ...json];
      return [...prevDialogs, ...json]
    });
    
    console.log("UPDATED DATA: ");
    console.log(updatedData);
    const parsedData = parser(updatedData);
    console.log(parsedData);
    setDataTable([...parsedData]);

    setSelectedItem(prev => {
      console.log("PREVIOUS SELECTED ITEM: ");
      console.log(prev);

      // console.log(parsedData.find(item => item.userId === prev.userId));

      const newSel = prev ? parsedData.find(item => item.userId === prev.userId) : prev;
      console.log("-----NEW SELECTED-----");
      console.log(newSel);
      return newSel;

    });
  }

  const selectDialog = (value) => {
    setVisible(false);
    setSelectedItem(value);
    setSelectedId(value.userId);

    console.log(value);
    if (value.hasNotification) {
      const hasNotificationIds = value.messages.
        filter(item => item.is_alert).
        map(item => item.id);
      console.log("IDS:");
      console.log(hasNotificationIds);
      clearUnreadMessages(hasNotificationIds);
      console.log("allDialogs: ", allDialogs.length);
      const unclearedItems = allDialogs.filter(item => hasNotificationIds.indexOf(item.id) >= 0);
      const restItemstems = allDialogs.filter(item => hasNotificationIds.indexOf(item.id) < 0);
      console.log(unclearedItems);
      const updatedItems = unclearedItems.map(item => {
        const {action, admin_id, create_date, date, id, lang, name_surname, response_email, telegram_id, time} = item;
        return { is_alert: null, action, admin_id, create_date, date, id, lang, name_surname, response_email, telegram_id, time }
      })
      console.log("unclearedItems: ", unclearedItems.length);
      console.log("restItemstems: ", restItemstems.length);
      const updatedData = parser([...updatedItems, ...restItemstems]);
      setAllDialogs([...updatedItems, ...restItemstems]);
      console.log("LAST ITEM");
      console.log(updatedData[updatedData.length - 1]);
      setDataTable(updatedData);
    }
  }

  return( loadingDialogs ? <Flex align="center" justify="center">
      <Spin size="large" fullscreen={true} tip="Loading"/>
    </Flex> :
    <>
    {
      errorConnection ? <div
        className="errorConnection"
      >
        Socket error connection. Please, try again later.
      </div> :
        <section className={"mainContent " + (visible ? "visible" : "")}>
          <section className="listContainer">
            {
              dataTable && dataTable.length > 0 && dataTable.map((item) => {
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
              hasUpdates={selectedId}
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