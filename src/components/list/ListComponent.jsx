import { useState } from "react";
import "./styles.scss";

function ListComponent({ data }) {
  console.log(data);
  const [selectedItem, setSelectedItem] = useState(null);

  const changeSelected = (item) => {
    console.log("changeSelected");
    setSelectedItem(item);
  };

  return(<section className="container">
    <div>
      {
        data.map((item) => {
          return(<div key={`${item.index}`} onClick={()=>changeSelected(item)}
          className={"item " + (selectedItem && selectedItem.index === item.index ? "selected" : "")}>
            <div className="image">
              {
                item.imageUrl ?
                <img src={item.imageUrl} alt="Image"/>:
                <span>No image</span>
              }
            </div>
            <div className="details">
              <div className="name">{item.author || "Unknown author"}</div>
              <div className="titleArticle">{item.title}</div>
            </div>
          </div>);
        })
      }
    </div>
    <div className="subContainer">
      {
        selectedItem ? 
        <div className="articleContainer">
          { selectedItem.imageUrl && <div>
            <img className="image" src={selectedItem.imageUrl} alt="Image"/></div>}
          <div><span className="descr">Author:</span> <span>{selectedItem.author}</span></div>
          <div><span className="descr">Title:</span> <span>{selectedItem.title}</span></div>
          <div><a href={selectedItem.url}>Click to open article</a></div>
        </div>:
        <div className="noArticle">Choose article to display details.</div>
      }
    </div>
  </section>);
}

export default ListComponent;