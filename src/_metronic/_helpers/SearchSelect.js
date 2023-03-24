import React, { useEffect, useState, useRef } from "react";
import AsyncSelect from "react-select/async";

export function SearchSelect({
  name,
  label,
  id,
  onChange,
  onBlure,
  error,
  touched,
  options,
  value,
  onInputChange,
}) {
  const [selectedOption, setSelectedOption] = useState();

  const filterColors = (inputValue) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) => {
    // return filterColors(inputValue);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 500);
    });
  };

  return (
    <>
      {label && <label> {label}</label>}
      <AsyncSelect
        onBlure={onBlure}
        onChange={onChange}
        value={value}
        defaultOptions={options}
        loadOptions={promiseOptions}
      />

      {error && touched ? <div className="form-feedBack">{error}</div> : null}
      {/* {JSON.stringify(selectedOption)} */}
    </>
  );
}
