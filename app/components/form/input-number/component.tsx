import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
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
}

const FormInputNumber = forwardRef<any, FormInputNumberProps>(
  ({ label, className = 'field', inputClassName, value, isError, required, placeholder, autoFocus, onChange, errorMessage, ...rest }, ref) => (
    <div className={className}>
      {label && <label htmlFor="name">{label}</label>}
      <InputNumber
        ref={ref}
        {...rest}
        value={value}
        onChange={onChange}
        required={required}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className={classNames(
          {
            'p-invalid': isError
          },
          inputClassName
        )}
      />
      {isError && <small className="text-red-500">{errorMessage}</small>}
    </div>
  )
);

FormInputNumber.displayName = 'FormInputNumber';

export default FormInputNumber;
