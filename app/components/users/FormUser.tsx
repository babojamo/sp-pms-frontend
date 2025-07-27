'use client';

import { SelectItem } from "primereact/selectitem";
import FormDropdown from "../form/dropdown/component";
import FormInputText from "../form/input-text/component";

interface FormUserProps {
  styleOptions: SelectItem[]
}

const FormUser = ({ styleOptions = [] }: FormUserProps) => {
  return (
    <>
      <FormInputText label='ID' />
      <FormInputText label='Employee Name' />
      <FormInputText label='Username' />
      <FormInputText label='Password' />
      <FormDropdown label='User Type' options={styleOptions} />
    </>
  );
}


export default FormUser;