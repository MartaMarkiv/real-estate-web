import React from "react";
import { Form } from "antd";
import ButtonComponent from "../button/ButtonComponent";

function SubmitButton({ form, submitForm }) {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  return (
    <ButtonComponent
      text="Sign in"
      typeButton="submit"
      sendAction={submitForm}
      disabled={!submittable}
    />
  );
}

export default SubmitButton;