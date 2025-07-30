import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import React, { forwardRef } from 'react';

interface FormCalendarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    isError?: boolean;
    errorMessage?: string;
    onChange?: any;
    placeholder?: string;
    className?: string;
}

const FormCalendar = forwardRef<HTMLInputElement, FormCalendarProps>(({ label = 'Label', isError, onChange, errorMessage, className }, ref) => (
    <>
        <div className="field">
            <label htmlFor="name">{label}</label>
            <Calendar
                inputRef={ref}
                className={classNames(
                    className,
                    {
                        'p-invalid': isError
                    },
                    'w-full'
                )}
                onChange={onChange}
            />
            {isError && <small className="p-invalid">{errorMessage}</small>}
        </div>
    </>
));

export default FormCalendar;
