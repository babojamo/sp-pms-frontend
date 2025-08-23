'use client';

import FormInputText from '../form/input-text/component';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SectionForm } from '@/app/types/section';
import FormDropdown from '../form/dropdown/component';
import { SelectItem } from 'primereact/selectitem';
import { DefaultFormData } from '@/app/types/form';

interface FormSectionProps {
  value?: SectionForm;
  onSubmit?: any;
  children?: any;
  departments?: SelectItem[];
  loading?: {
    deparmentField: boolean;
  };
}

interface FormData extends DefaultFormData {
  name: string;
  department_id?: string;
};

const FormSection = ({ onSubmit, children, departments, loading }: FormSectionProps) => {
  const { control, handleSubmit } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ fieldState, field }) => (
          <FormInputText {...field} label="Name" placeholder='Input' errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
        )}
      />
      <Controller
        name="department_id"
        control={control}
        rules={{ required: 'Department is required' }}
        render={({ fieldState, field }) => (
          <FormDropdown  {...field}  label="Department" placeholder="Select" loading={loading?.deparmentField} options={departments} errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />

        )}
      />
      {children}
    </form>
  );
};

export default FormSection;
