'use client';

import FormInputText from '../form/input-text/component';
import { OperatorForm } from '@/app/types/operator';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SelectItem } from 'primereact/selectitem';
import FormDropdown from '../form/dropdown/component';
import FormMultiDropdown from '../form/multi-dropdown/component';

interface FormOperatorProps {
  value?: OperatorForm;
  lines: SelectItem[];
  onSubmit?: any;
  children?: any;
  processesOptions?: SelectItem[];
}

type FormData = {
  name: string;
  line_id: string;
  process_ids?: string[];
};

const FormOperator = ({ value, onSubmit, children, lines, processesOptions }: FormOperatorProps) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    register,
    setValue
  } = useForm<FormData>();

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
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ fieldState }) => <FormInputText label="Name" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />}
      />

      <Controller
        name="line_id"
        control={control}
        rules={{ required: 'Line is required' }}
        render={({ field, fieldState }) => (
          <FormDropdown
            value={field.value}
            onChange={(e: any) => field.onChange(e.value)}
            label="Line "
            errorMessage={fieldState.error?.message}
            isError={fieldState.error ? true : false}
            options={lines}
          />
        )}
      />

      <Controller
        name="process_ids"
        control={control}
        rules={{ required: 'Process is required' }}
        render={({ field, fieldState }) => (
          <FormMultiDropdown
            value={field.value}
            onChange={(e: any) => field.onChange(e.value)}
            label="Processes"
            errorMessage={fieldState.error?.message}
            isError={fieldState.error ? true : false}
            options={processesOptions}
          />
        )}
      />

      {children}
    </form>
  );
};

export default FormOperator;
