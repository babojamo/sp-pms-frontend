import { MultiSelect } from 'primereact/multiselect';
import { SelectItem } from 'primereact/selectitem';
import { classNames } from 'primereact/utils';
import React, { forwardRef } from 'react';

interface FormMultiDropdownProps {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  options?: SelectItem[];
  onChange?: any;
  placeholder?: any;
  className?: string;
  filter?: any;
}

const FormMultiDropdown = forwardRef<any, FormMultiDropdownProps>(({ label, filter, isError, className = 'field', placeholder, onChange, errorMessage, options, ...rest }, ref) => (
  <div className={className}>
    {label && <label htmlFor="name">{label}</label>}
    <MultiSelect
      inputRef={ref}
      {...rest}
      filter={filter}
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

    {isError && <small className="text-red-500">{errorMessage}</small>}
  </div>
));

FormMultiDropdown.displayName = 'FormMultiDropdown';

export default FormMultiDropdown;
