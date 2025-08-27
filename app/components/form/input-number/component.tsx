import { InputNumber, InputNumberChangeEvent, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import React, { forwardRef } from 'react';

interface FormInputNumberProps {
  value?: any;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  required?: boolean;
  inputClassName?: string;
  className?: string;
  placeholder?: string;
  onChange?: (event: InputNumberChangeEvent) => void;
  onValueChange?: (event: InputNumberValueChangeEvent) => void;
}

const FormInputNumber = forwardRef<any, FormInputNumberProps>(
  (
    { label, className = 'field', inputClassName, value, isError, required, placeholder, autoFocus, onChange, onValueChange, errorMessage, ...rest },
    ref
  ) => (
    <div className={className}>
      {label && <label htmlFor="name">{label}</label>}
      <InputNumber
        ref={ref}
        {...rest}
        value={value}
        onChange={onChange}
        required={required}
        onValueChange={onValueChange}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className={classNames(
          {
            'p-invalid': isError
          },
          inputClassName
        )}
      />
      {isError && (
        <div>
          <small className="text-red-500">{errorMessage}</small>
        </div>
      )}
    </div>
  )
);

FormInputNumber.displayName = 'FormInputNumber';

export default FormInputNumber;
