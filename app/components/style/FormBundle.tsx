'use client';

import { Controller, useForm } from 'react-hook-form';
import { FormReleaseBundle, StylePlannedFabricSize } from '@/app/types/styles';
import { SelectItem } from 'primereact/selectitem';
import FormDropdown from '../form/dropdown/component';
import FormInputNumber from '../form/input-number/component';
import FormInputText from '../form/input-text/component';
import React, { useEffect } from 'react';

interface FormBundleProps {
  value?: FormReleaseBundle;
  onSubmit?: any;
  children?: any;
  colorOptions?: SelectItem[];
  sizesOptions?: StylePlannedFabricSize[];
}

const FormBundle = ({ value, onSubmit, children, colorOptions = [], sizesOptions = [] }: FormBundleProps) => {
  const { control, handleSubmit, reset } = useForm<FormReleaseBundle>({
    defaultValues: {
      style_planned_fabric_id: '',
      style_planned_fabric_size_id: '',
      quantity: 0,
      remarks: ''
    }
  });

  const sizes = React.useMemo(() => sizesOptions
    ?.filter((s) => s.style_planned_fabric_id.toString() == value?.style_planned_fabric_id)
    ?.map((r) => ({
      label: `${r.size_number.toString()} - ${r.quantity.toString()}`,
      value: r.id
    })) ?? [], [colorOptions]);

  useEffect(() => {
    if (value) {
      reset({
        id: value.id,
        style_planned_fabric_id: value?.style_planned_fabric_id,
        style_planned_fabric_size_id: value?.style_planned_fabric_size_id,
        quantity: value?.quantity,
        remarks: value?.remarks,
      });
    }
  }, [value, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name={`style_planned_fabric_id` as const}
        rules={{ required: 'Color is required' }}
        render={({ field, fieldState }) => (
          <FormDropdown
            {...field}
            value={field.value}
            onChange={(e: any) => field.onChange(e.value)}
            placeholder="Select"
            label='Color'
            filter
            errorMessage={fieldState.error?.message}
            isError={fieldState.error ? true : false}
            options={colorOptions}
          />
        )}
      />
      <Controller
        control={control}
        name={`style_planned_fabric_size_id` as const}
        rules={{ required: 'Size is required' }}
        render={({ field, fieldState }) => (
          <FormDropdown
            {...field}
            label='Size'
            value={field.value}
            onChange={(e: any) => field.onChange(e.value)}
            placeholder="Select"
            filter
            errorMessage={fieldState.error?.message}
            isError={fieldState.error ? true : false}
            options={sizes}
          />
        )}
      />
      <Controller
        control={control}
        name={`quantity` as const}
        rules={{ required: 'Quantity is required', min: { value: 1, message: 'Minimum is 1' } }}
        render={({ field, fieldState }) => (
          <FormInputNumber
            label='Quantity'
            value={field.value as number | null}
            onValueChange={(e) => field.onChange(e.value ?? null)}
            placeholder="Number"
            errorMessage={fieldState.error?.message}
            isError={fieldState.error ? true : false}
          />
        )}
      />
      <Controller
        control={control}
        name={`remarks` as const}
        render={({ field, fieldState }) => (
          <FormInputText {...field} label='Remarks' placeholder="Text" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
        )}
      />
      {children}
    </form>
  );
};

export default FormBundle;
