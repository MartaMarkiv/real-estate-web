import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../../api";
import "./styles.scss";
import DialogComponent from "../../components/dialog/DialogComponent";
import DialogItem from "../../components/dialogItem/DialogItem";

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
    fetchData();
  }, [fetchData]);

  return(<section className="mainContent">
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
  );
}

export default Main;