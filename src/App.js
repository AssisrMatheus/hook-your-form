import React from "react";
import HookYourForm from "./hook-your-form/HookYouForm";

const onValidate = form => {
  const errors = {};
  if (form.myText && form.myText.indexOf("abcd") !== -1) {
    errors.myText = "You can't";
  }

  return errors;
};

const App = () => (
  <div className="App">
    <HookYourForm initialState={{ myCheckArray: [] }} validate={onValidate}>
      {(handleChange, form, dirty, errors) => (
        <div>
          <input name="myText" value={form.myText} onChange={handleChange} />
          {dirty.myText && errors.myText && (
            <p style={{ color: "red" }}>{errors.myText}</p>
          )}
          <br />
          <div>
            <input
              type="checkbox"
              id={0}
              name="myCheckArray"
              checked={form.myCheckArray[0]}
              onChange={handleChange}
            />
            {dirty.myCheckArray && errors.myCheckArray && (
              <p style={{ color: "red" }}>{errors.myCheckArray[0]}</p>
            )}
            <br />
            <input
              type="checkbox"
              id={1}
              name="myCheckArray"
              checked={form.myCheckArray[1]}
              onChange={handleChange}
            />
            {dirty.myCheckArray && errors.myCheckArray && (
              <p style={{ color: "red" }}>{errors.myCheckArray[1]}</p>
            )}
          </div>
          <pre>{JSON.stringify(form)}</pre>
        </div>
      )}
    </HookYourForm>
  </div>
);

export default App;
