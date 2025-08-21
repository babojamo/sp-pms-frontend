'use client';

import { Controller, useForm } from 'react-hook-form';
import { DefaultFormData } from '@/app/types/form';
import { ProcessOffsetForm } from '@/app/types/process-offset';
import { useEffect } from 'react';
import FormInputText from '../form/input-text/component';

interface FormProcessOffsetProps {
  value?: ProcessOffsetForm;
  onSubmit?: any;
  children?: any;
}

interface FormData extends DefaultFormData {
  name: string;
  description: string;
}

const FormProcessOffset = ({ value, onSubmit, children }: FormProcessOffsetProps) => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: ''
    }
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
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ fieldState, field }) => (
          <FormInputText {...field} label="Name" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{ required: 'Description is required' }}
        render={({ fieldState, field }) => (
          <FormInputText {...field} label="Description" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
        )}
      />
      {children}
    </form>
  );
};

export default FormProcessOffset;
