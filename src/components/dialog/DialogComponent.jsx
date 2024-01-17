import "./styles.scss";

function DialogComponent({data}) {
  return (
    <section className="dialogWrapper">
      { data.imageUrl && <div>
        <img className="image" src={data.imageUrl} alt="Image"/></div>}
      <div><span className="descr">Author:</span> <span>{data.author}</span></div>
      <div><span className="descr">Title:</span> <span>{data.title}</span></div>
      <div><a href={data.url}>Click to open article</a></div>
    </section>
    )
}

export default DialogComponent;