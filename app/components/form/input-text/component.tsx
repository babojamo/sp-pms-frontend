import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React from 'react';

interface FormInputTextProps {
  value?: any;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  required?: boolean;
  onChange?: React.ChangeEventHandler
}

const FormInputText = ({ label = 'Label', value, isError, required, autoFocus, onChange, errorMessage }: FormInputTextProps) => {
  return (
    <>
      <div className="field">
        <label htmlFor="name">{label}</label>
        <InputText
          id="name"
          value={value}
          onChange={onChange}
          required={required}
          autoFocus={autoFocus}
          className={classNames({
            'p-invalid': isError
          })}
        />
        {isError && <small className="p-invalid">{errorMessage}</small>}
      </div>
    </>
  );
};

export default FormInputText;
