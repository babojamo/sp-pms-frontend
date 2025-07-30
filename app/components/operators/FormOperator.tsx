'use client';

import FormInputText from "../form/input-text/component";
import { OperatorForm } from "@/app/types/operator";
import { useEffect } from "react";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SelectItem } from "primereact/selectitem";
import FormDropdown from "../form/dropdown/component";

interface FormOperatorProps {
  value?: OperatorForm
  lines: SelectItem[],
  onSubmit?: any;
  children?: any;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  line_id: yup.string().required('Line is required'),

});

const FormOperator = ({ value, onSubmit, children, lines }: FormOperatorProps) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (value) {
      reset({
        name: value?.name,
      })
    }
  }, [value])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputText {...register('name')} label='Employee Name' errorMessage={errors.name?.message} isError={errors.name ? true : false} />
      <FormDropdown {...register('line_id')} label='Sewing Line' errorMessage={errors.line_id?.message} isError={errors.line_id ? true : false} options={lines} />
      {children}
    </form>
  );
}


export default FormOperator;