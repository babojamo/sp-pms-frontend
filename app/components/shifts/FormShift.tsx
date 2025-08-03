'use client';

import FormInputText from '../form/input-text/component';
import { OperatorForm } from '@/app/types/operator';
import { useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormShiftProps {
  value?: OperatorForm;
  onSubmit?: any;
  children?: any;
}

const schema = yup.object().shape({
  from_time: yup.string().required('Name is required'),
  to_time: yup.string().required('Name is required'),
  break: yup.string().required('Name is required')
});

const FormShift = ({ value, onSubmit, children }: FormShiftProps) => {
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
      <FormInputText {...register('name')} label="Name" errorMessage={errors.name?.message} isError={errors.name ? true : false} />
      {children}
    </form>
  );
};

export default FormShift;
