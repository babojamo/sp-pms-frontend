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
  className?: string;
  loading?: boolean;
  value?: any;
  filter?: boolean;
}

const FormDropdown = forwardRef<any, FormDropdownProps>(
  ({ label, isError, value, className = 'field', placeholder, filter, loading, onChange, errorMessage, options, ...rest }, ref) => (
    <div className={className}>
      {label && <label htmlFor="name">{label}</label>}
      <Dropdown
        value={value}
        inputRef={ref}
        {...rest}
        filter={filter}
        onChange={onChange}
        placeholder={placeholder}
        loading={loading}
        options={options}
        optionLabel="label"
        className={classNames(
          {
            'p-invalid': isError
          },
          'w-full'
        )}
      />

      {isError && <small className="text-red-500">{errorMessage}</small>}
    </div>
  )
);

FormDropdown.displayName = 'FormDropdown';

export default FormDropdown;
