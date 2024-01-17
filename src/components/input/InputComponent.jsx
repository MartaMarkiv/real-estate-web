import "./styles.scss";

function InputComponent({typeInput, placeholder, changeValue, textValue, id}) {
  return(<input
      id={id}
      className="inputComponent"
      type={typeInput}
      value={textValue}
      placeholder={placeholder}
      onChange={changeValue}
    />)
}

export default InputComponent;