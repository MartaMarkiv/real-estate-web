import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { w3cwebsocket as WebSocket } from "websocket";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./styles.scss";
import DialogComponent from "../../components/dialog/DialogComponent";
import DialogItem from "../../components/dialogItem/DialogItem";
import { parser } from "../../utils/parser";
import Cookies from "universal-cookie";
import { Flex, Spin } from "antd";

const cookies = new Cookies();

const socketConn = "wss://client_history";


function Main({userToken}) {
  const [dataTable, setDataTable] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadingDialogs, setLoadingDialogs] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [messagesData, setMessagesData] = useState([]);
  const [errorConnection, setErrorConnection] = useState(false);

  const navigate = useNavigate();

  const client = new WebSocket(`${socketConn}?token=${userToken}`);


  const fetchData = useCallback(async () => {
    await api.get(`top-headlines?country=us&apiKey=9abaa2f7310f448db3fdb531a85093cc`)
      .then(resp => {
        console.log(resp);
        const data = resp.data["articles"].map(item => {
          const { urlToImage: imageUrl, title, author, description, publishedAt, url } = item;
          const index = uuidv4();
          return { imageUrl, title, author, description, publishedAt, url, index };
        });
        setDataTable(data);
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const connectSocket = () => {

    client.onmessage = (event) => {
      console.log("on message");
      setLoadingDialogs(false);
      
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
      
      const allOMessages = json.length ? json.map(item => item.games).flat() : [];

      const parsedData = parser(allOMessages);

      setMessagesData(parsedData);
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
      <section className="mainContent">
        <section className="listContainer">
          {
            dataTable?.map((item) => {
              return <DialogItem
                key={item.index}
                item={item}
                changeSelected={setSelectedItem}
                selectedItem={selectedItem}
              />
            })
          }
        </section>
        <section className="dialogContainer">
        {
          selectedItem ? 
          <DialogComponent data={selectedItem} />:
          <div className="noArticle">Choose article to display details.</div>
        }
      </section>
    </section>
  }
  </>
  );
}

export default Main;