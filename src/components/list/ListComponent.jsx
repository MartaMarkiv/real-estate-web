import "./styles.scss";

function ListComponent({ data, selectedItem, changeItem }) {

  const changeSelected = (item) => {
    console.log("changeSelected");
    changeItem(item);
  };

  return(<section className="listContainer">
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
  </section>);
}

export default ListComponent;