'use client';

import FormInputText from '../form/input-text/component';
import { OperatorForm } from '@/app/types/operator';
import { useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormDepartmentProps {
  value?: OperatorForm;
  onSubmit?: any;
  children?: any;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required')
});

const FormDepartment = ({ value, onSubmit, children }: FormDepartmentProps) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (value) {
      reset({
        name: value?.name
      });
    }
  }, [value, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputText {...register('name')} label="Employee Name" errorMessage={errors.name?.message} isError={errors.name ? true : false} />
      {children}
    </form>
  );
};

export default FormDepartment;
