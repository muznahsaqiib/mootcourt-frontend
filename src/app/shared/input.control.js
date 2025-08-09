// components/InputControl.js
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const InputControl = ({
  label,
  name,
  type = 'text',
  register,
  error,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="field">
      <label htmlFor={name} className="block text-900 font-medium mb-2">
        {label}
      </label>

      <div className="p-inputgroup">
        <InputText
          id={name}
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          {...register(name)}
          className={classNames({ 'p-invalid': error })}
        />
        {showPasswordToggle && (
          <span
            className="p-inputgroup-addon"
            style={{ cursor: 'pointer' }}
            onClick={togglePassword}
          >
            <i className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}></i>
          </span>
        )}
      </div>

      {error && <small className="p-error">{error.message}</small>}
    </div>
  );
};

export default InputControl;
