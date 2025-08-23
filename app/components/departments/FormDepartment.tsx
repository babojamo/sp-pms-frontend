'use client';

import FormInputText from '../form/input-text/component';
import { useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DepartmentForm } from '@/app/types/department';

interface FormDepartmentProps {
  value?: DepartmentForm;
  onSubmit?: any;
  children?: any;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required')
});

const FormDepartment = ({ value, onSubmit, children }: FormDepartmentProps) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (value) {
      reset({
        name: value?.name
      });
    }
  }, [value]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputText placeholder="Name" {...register('name')} label="Name" errorMessage={errors.name?.message} isError={errors.name ? true : false} />
      {children}
    </form>
  );
};

export default FormDepartment;
