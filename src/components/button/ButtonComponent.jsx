import "./styles.scss";
import { Button } from "antd";

function ButtonComponent({text, sendAction, typeButton = "button", disabled = false}) {
  return <Button
    className="button"
    type="primary"
    htmlType={typeButton}
    onClick={()=>sendAction}
    disabled={disabled}
  >
    {text}
  </Button>
}

export default ButtonComponent;