'use client';

import FormInputText from '../form/input-text/component';
import { useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SewingLineForm } from '@/app/types/sewing-line';

interface FormSewingLineProps {
  value?: SewingLineForm;
  onSubmit?: any;
  children?: any;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  line_id: yup.string().required('Line is required')
});

const FormSewingLine = ({ value, onSubmit, children }: FormSewingLineProps) => {
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
      // @ts-ignore
      reset({
        name: value?.name
      });
    }
  }, [value]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputText {...register('name')} label="Name" errorMessage={errors.name?.message} isError={errors.name ? true : false} />
      {children}
    </form>
  );
};

export default FormSewingLine;
