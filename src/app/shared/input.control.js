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
    <div className="mb-4">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-left text-gray-800 mb-1 font-medium"
      >
        {label}
      </label>

      {/* Input with optional password toggle */}
      <div className="relative">
        <InputText
          id={name}
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          {...register(name)}
          className={classNames(
            'w-full px-4 py-2 rounded-lg border bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition',
            { 'border-red-500 ring-1 ring-red-500': error }
          )}
        />

        {showPasswordToggle && (
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-red-800"
            onClick={togglePassword}
          >
            <i
              className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
            ></i>
          </span>
        )}
      </div>

      {/* Error text */}
      {error && <small className="text-red-600 text-sm">{error.message}</small>}
    </div>
  );
};

export default InputControl;
