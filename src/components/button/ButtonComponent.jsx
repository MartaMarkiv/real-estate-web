import "./styles.scss";

function ButtonComponent({text, sendAction, typeButton = "button"}) {
  return <button
    className="button"
    onClick={sendAction}
    type={typeButton}
  >
    {text}
  </button>
}

export default ButtonComponent;