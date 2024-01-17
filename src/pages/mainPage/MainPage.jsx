import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../../api";
import "./styles.scss";
import ListComponent from "../../components/list/ListComponent";
import DialogComponent from "../../components/dialog/DialogComponent";

function Main() {
  const [dataTable, setDataTable] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = useCallback(async () => {
    await api.get(`top-headlines?country=us&apiKey=9abaa2f7310f448db3fdb531a85093cc`)
      .then(resp => {
        const data = resp.data["articles"].map(item => {
          const { urlToImage: imageUrl, title, author, description, publishedAt, url } = item;
          const index = uuidv4();
          return { imageUrl, title, author, description, publishedAt, url, index };
        });
        setDataTable(data);
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {});
  }, []);

  useEffect(() => {
    console.log("fetch data");
    fetchData();
  }, [fetchData]);

  return(<section className="mainContent">
        <ListComponent data={dataTable} selectedItem={selectedItem} changeItem={setSelectedItem} />
        <section className="dialogContainer">
        {
          selectedItem ? 
          <DialogComponent data={selectedItem} />:
          <div className="noArticle">Choose article to display details.</div>
        }
      </section>
    </section>
  );
}

export default Main;