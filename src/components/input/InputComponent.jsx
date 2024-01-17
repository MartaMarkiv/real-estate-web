import "./styles.scss";

function InputComponent({typeInput, placeholder, changeValue, textValue}) {
  return(<input
      className="inputComponent"
      type={typeInput}
      value={textValue}
      placeholder={placeholder}
      onChange={changeValue}
    />)
}

export default InputComponent;