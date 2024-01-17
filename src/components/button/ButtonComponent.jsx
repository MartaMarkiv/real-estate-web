import "./styles.scss";

function ButtonComponent({text, sendAction}) {
  return <button className="button" onClick={sendAction}>{text}</button>
}

export default ButtonComponent;