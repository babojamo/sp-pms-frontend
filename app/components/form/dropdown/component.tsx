import { Dropdown } from 'primereact/dropdown';
import { SelectItem } from 'primereact/selectitem';
import { classNames } from 'primereact/utils';
import React from 'react';

interface FormDropdownProps {
  value?: any;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  options?: SelectItem[];
  onChange?: any,
  placeholder?: string;
}

const FormDropdown = ({ label, placeholder, value, isError, onChange, errorMessage, options }: FormDropdownProps) => {
  return (
    <>
      <div className="field">
        {label && <label htmlFor="name">{label}</label>}
        <Dropdown
          value={value}
          onChange={onChange}
          options={options}
          optionLabel='label'
          placeholder={placeholder} className={classNames({
            'p-invalid': isError
          }, 'w-full')} />

        {isError && <small className="p-invalid">{errorMessage}</small>}
      </div>
    </>
  );
};

export default FormDropdown;
