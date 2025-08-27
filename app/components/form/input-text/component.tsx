import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React, { forwardRef } from 'react';

interface FormInputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: any;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  required?: boolean;
  inputClassName?: string;
  onChange?: React.ChangeEventHandler;
}

const FormInputText = forwardRef<HTMLInputElement, FormInputTextProps>(
  ({ label, className = 'field', inputClassName, value, isError, required, autoFocus, onChange, errorMessage, ...rest }, ref) => (
    <div className={className}>
      {label && <label htmlFor="name">{label}</label>}
      <InputText
        ref={ref}
        {...rest}
        value={value}
        onChange={onChange}
        required={required}
        autoFocus={autoFocus}
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

FormInputText.displayName = 'FormInputText';

export default FormInputText;
