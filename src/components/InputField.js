import { useState } from "react";
import Visible from "./../Images/visible.svg";
const TextInput = ({
  label,
  value,
  type,
  name,
  placeholder,
  handleChange,
  showPassword,
  setShowPassword,
  error,
  helperText,
  readonly,
}) => {
  return (
    <div class="input-field">
      <label for="exampleFormControlInput1" class="form-label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        class="form-control"
        id="exampleFormControlInput1"
        placeholder={placeholder}
        readOnly={readonly}
        style={{paddingRight:setShowPassword ? "40px" : "0px"}}
      />
      {setShowPassword && (
        <img
          className="visible-icon"
          src={Visible}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
      {error && (
        <div
          style={{
            color: "red",
            textAlign: "left",
            marginLeft:'9px',
            fontSize: "13px",
            marginBottom: "-4px",
            marginTop:"3px"
          }}
        >
          <span>{helperText}</span>
        </div>
      )}
    </div>
  );
};
export default TextInput;
