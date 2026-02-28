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

  return (
    <div className="mb-5">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-left text-stone-700 text-sm font-semibold mb-1.5 tracking-wide"
      >
        {label}
      </label>

      {/* Input wrapper */}
      <div className="relative group">
        <InputText
          id={name}
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          {...register(name)}
          className={classNames(
            'w-full px-4 py-2.5 rounded-lg border bg-rose-50/50 text-neutral-900 text-sm',
            'placeholder:text-stone-400',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 focus:bg-white',
            'hover:border-rose-300',
            error
              ? 'border-red-400 ring-1 ring-red-400 bg-red-50/40'
              : 'border-rose-200'
          )}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-rose-700 transition-colors duration-150 focus:outline-none"
            tabIndex={-1}
          >
            <i className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'} text-sm`} />
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <i className="pi pi-exclamation-circle text-xs" />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputControl;