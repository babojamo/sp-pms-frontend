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
  maxSelectedLabels?: number;
  value?: any;
  loading?: boolean;
}

const FormMultiDropdown = forwardRef<any, FormMultiDropdownProps>(
  (
    { label, filter, isError, className = 'field', placeholder, loading, value, onChange, maxSelectedLabels = 3, errorMessage, options, ...rest },
    ref
  ) => (
    <div className={className}>
      {label && <label htmlFor="name">{label}</label>}
      <MultiSelect
        inputRef={ref}
        {...rest}
        value={value}
        filter={filter}
        onChange={onChange}
        placeholder={placeholder}
        loading={loading}
        maxSelectedLabels={maxSelectedLabels}
        options={options}
        optionLabel="label"
        className={classNames(
          {
            'p-invalid': isError
          },
          'w-full'
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

FormMultiDropdown.displayName = 'FormMultiDropdown';

export default FormMultiDropdown;
