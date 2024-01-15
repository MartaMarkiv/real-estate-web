import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../../api";
import "./styles.scss";
import ListComponent from "../../components/list/ListComponent";

function Main() {
  const [error, setError] = useState(false);
  const [dataTable, setDataTable] = useState([]);

  const fetchData = useCallback(async () => {
    console.log("inside");
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
      .catch(err => {
        setError(true);
      });
  }, []);

  useEffect(() => {
    console.log("fetch data");
    fetchData();
  }, [fetchData]);

  return(<section className="content">
    { error ?
      <div className="title">Error happened</div>:
      <div>
        <div className="title tableOperationWrapper">
          <span>Formula top headlines</span>
        </div>
        <ListComponent data={dataTable} />
      </div>
    }
    </section>
  );
}

export default Main;