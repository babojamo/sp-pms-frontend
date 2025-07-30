import { Dropdown } from 'primereact/dropdown';
import { SelectItem } from 'primereact/selectitem';
import { classNames } from 'primereact/utils';
import React, { forwardRef } from 'react';

interface FormDropdownProps {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  options?: SelectItem[];
  onChange?: any;
  placeholder?: any;
}

const FormDropdown = forwardRef<any, FormDropdownProps>(({ label, isError, placeholder, onChange, errorMessage, options, ...rest }, ref) => (
  <>
    <div className="field">
      {label && <label htmlFor="name">{label}</label>}
      <Dropdown
        inputRef={ref}
        {...rest}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        optionLabel="label"
        className={classNames(
          {
            'p-invalid': isError
          },
          'w-full'
        )}
      />

      {isError && <small className="p-invalid">{errorMessage}</small>}
    </div>
  </>
));

export default FormDropdown;
