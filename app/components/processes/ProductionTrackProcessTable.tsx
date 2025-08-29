'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import { DataTable } from 'primereact/datatable';
import { FormReleaseBundle, StylePlannedFabricSize } from '@/app/types/styles';
import FormInputNumber from '../form/input-number/component';
import FormInputText from '../form/input-text/component';
import React, { useEffect, useState } from 'react';
import { SelectItem } from 'primereact/selectitem';
import FormDropdown from '../form/dropdown/component';
import { Operator, OperatorProcess } from '@/app/types/operator';

interface FormStyleProps {
  control?: any;
  operatorsOption?: SelectItem[];
  disabled?: boolean;
  operators?: Operator[];
  onShowOutput?: any;
  onProcessDeleteClick?: any;
}

const ProductionTrackProcessTable = ({ control, disabled, operatorsOption, operators, onShowOutput, onProcessDeleteClick }: FormStyleProps) => {
  const items = useWatch({ control, name: 'tracks' }) || [];

  const getProcessOptions = (rowIndex: number): SelectItem[] => {
    const option = items[rowIndex];
    return (
      operators
        ?.find((s) => s.id == option.value)
        ?.processes?.map(p => ({ value: p.id, label: p.name })) ?? []
    );
  };

  const emptyItem = (): FormReleaseBundle => ({
    id: items?.length + 1,
    style_planned_fabric_id: '',
    style_planned_fabric_size_id: '',
    quantity: 0,
    remarks: ''
  });



  const { append, remove } = useFieldArray({
    control,
    name: 'tracks'
  });

  const actionBodyTemplate = (rowData: OperatorProcess) => {
    return (
      <div className="flex gap-2">
        <Button size="small" icon="pi pi-eye" onClick={() => onShowOutput && onShowOutput(rowData)} label="Show Ouputs" severity="warning" />
        <Button size="small" onClick={() => onProcessDeleteClick(rowData.id)} icon="pi pi-trash" severity="danger" />
      </div>
    );
  };


  const addNewItem = () => {
    append(emptyItem());
  };

  return (
    <DataTable
      rows={10}
      editMode="row"
      value={items}
      className="p-datatable-gridlines"
      showGridlines
      dataKey="id"
      filterDisplay="menu"
      emptyMessage="No record provided."
    >
      <Column field="id" header="#" />
      <Column
        field="operator_id"
        header="Operator"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`tracks.${options.rowIndex}.operator_id` as const}
            rules={{ required: 'Operator is required' }}
            render={({ field, fieldState }) => (
              <FormDropdown
                {...field}
                value={field.value}
                onChange={(e: any) => field.onChange(e.value)}
                placeholder="Select"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
                options={operatorsOption}
              />
            )}
          />
        )}
      />
      <Column
        field="process_id"
        header="Process"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`tracks.${options.rowIndex}.process_id` as const}
            rules={{ required: 'Process is required' }}
            render={({ field, fieldState }) => (
              <FormDropdown
                {...field}
                value={field.value}
                onChange={(e: any) => field.onChange(e.value)}
                placeholder="Select"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
                options={getProcessOptions(options.rowIndex)}
              />
            )}
          />
        )}
      />
      <Column
        field="target"
        header="Target"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`tracks.${options.rowIndex}.target` as const}
            rules={{ required: 'Target is required', min: { value: 1, message: 'Minimum is 1' } }}
            render={({ field, fieldState }) => (
              <FormInputNumber
                value={field.value as number | null}
                onValueChange={(e) => field.onChange(e.value ?? null)}
                placeholder="Number"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        )}
      />
      <Column
        field="remarks"
        header="Remarks"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`tracks.${options.rowIndex}.remarks` as const}
            render={({ field, fieldState }) => (
              <FormInputText {...field} placeholder="Text" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        )}
      />
      <Column field="total_output" header="Total Ouput" />
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
};

export default ProductionTrackProcessTable;
