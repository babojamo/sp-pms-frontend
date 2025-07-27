import { Calendar } from 'primereact/calendar';
import { SelectItem } from 'primereact/selectitem';
import { classNames } from 'primereact/utils';
import React from 'react';

interface FormCalendarProps {
  value?: any;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  onChange?: any,
  placeholder?: string;
  className?: string;
}

const FormCalendar = ({ label = 'Label', value, isError, onChange, errorMessage, className }: FormCalendarProps) => {
  return (
    <>
      <div className="field">
        <label htmlFor="name">{label}</label>
        <Calendar
          className={classNames(className, {
            'p-invalid': isError
          }, 'w-full')}
          value={value}
          onChange={onChange} />
        {isError && <small className="p-invalid">{errorMessage}</small>}
      </div>
    </>
  );
};

export default FormCalendar;
