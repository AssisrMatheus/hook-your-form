import React, { useState } from "react";
import PropTypes from "prop-types";

const onChange = (e, form, setForm, dirty, setDirty, setErrors, validate) => {
  const { target } = e;
  const { name, id, value, checked } = target;
  const key = name || id;

  setDirty({ ...dirty, [key]: true });

  if (target.type === "number" || target.type === "tel") {
    setForm({ ...form, [key]: parseInt(value.toString().trim(), 10) });
  } else if (target.type === "checkbox") {
    const array = form[key] ? [...form[key]] : [];
    array[+id] = checked;
    const newForm = { ...form, [key]: [...array] };
    setForm(newForm);
    if (validate) {
      setErrors(validate(newForm));
    }
  } else {
    setForm({ ...form, [key]: value });
  }
};

const onSubmit = e => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
};

const onBlur = (e, validate, form, setErrors) => {
  if (validate) {
    setErrors(validate(form));
  }
};

const HookYourForm = props => {
  const [form, setForm] = useState(props.initialState);
  const [dirty, setDirty] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = e =>
    onChange(e, form, setForm, dirty, setDirty, setErrors, props.validate);

  const handleBlur = e => onBlur(e, props.validate, form, setErrors);

  return (
    <form onSubmit={onSubmit} onBlur={handleBlur}>
      <div>{props.children(handleChange, form, dirty, errors)}</div>
    </form>
  );
};

HookYourForm.propTypes = {
  children: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  validate: PropTypes.func
};

HookYourForm.defaultProps = {
  initialState: {}
};

export default HookYourForm;
