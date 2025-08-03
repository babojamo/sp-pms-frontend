import { FileUpload } from 'primereact/fileupload';
import React, { forwardRef } from 'react';

interface FormInputFilePros extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: any;
  isError?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  required?: boolean;
  name?: any;
  onUpload?: any;
  accept?: string;
  maxFileSize?: number;
}

const FormInputFile = forwardRef<HTMLInputElement, FormInputFilePros>(({ name, accept, value, maxFileSize = 100000, isError, required, autoFocus, onUpload, errorMessage, ...rest }, ref) => (
  <div className="field">
    <FileUpload mode="basic" name={name} accept={accept} maxFileSize={maxFileSize} onUpload={onUpload} />
    {isError && <small className="text-red-500">{errorMessage}</small>}
  </div>
));

FormInputFile.displayName = 'FormInputFile';

export default FormInputFile;
