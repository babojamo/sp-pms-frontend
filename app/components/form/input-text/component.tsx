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
    onChange?: React.ChangeEventHandler;
}

const FormInputText = forwardRef<HTMLInputElement, FormInputTextProps>(({ label = 'Label', value, isError, required, autoFocus, onChange, errorMessage, ...rest }, ref) => (
    <>
        <div className="field">
            <label htmlFor="name">{label}</label>
            <InputText
                ref={ref}
                {...rest}
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
));

export default FormInputText;
