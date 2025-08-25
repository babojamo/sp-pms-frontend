'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import { DataTable } from 'primereact/datatable';
import { generateSimpleId } from '@/app/utils';
import { FormStyleFabric, StyleItem } from '@/app/types/styles';
import FormInputNumber from '../form/input-number/component';
import FormInputText from '../form/input-text/component';

interface FormStyleProps {
  control?: any;
}

const FormStyleFabricTable = ({ control }: FormStyleProps) => {
  const emptyItem = (): FormStyleFabric => ({
    id: 1,
    col_number: '',
    color: '',
    size_one: 0,
    size_two: 0,
    size_three: 0,
    size_four: 0,
    size_five: 0,
    total: 0
  });

  const items = useWatch({ control, name: 'style_fabrics' }) || [];

  const { append, remove } = useFieldArray({
    control,
    name: 'style_fabrics'
  });

  const actionBodyTemplate = (rowData: StyleItem, options: { rowIndex: number }) => {
    return (
      <div className="flex gap-2">
        <Button size="small" type="button" onClick={() => remove(options.rowIndex)} icon="pi pi-trash" rounded severity="danger" />
      </div>
    );
  };

  const tableHeader = () => {
    return (
      <div className="flex align-items-center">
        <p>Style Items</p>
        <div className="ml-auto flex align-items-center gap-2">
          <Button severity="help" type="button" onClick={onAddOperatorClick} className="mt-2" icon="pi pi-plus" label="Add" />
        </div>
      </div>
    );
  };

  const onAddOperatorClick = () => {
    addNewItem();
  };

  const addNewItem = () => {
    append(emptyItem());
  };

  return (
    <DataTable
      rows={10}
      editMode="row"
      header={tableHeader()}
      value={items}
      className="p-datatable-gridlines"
      showGridlines
      dataKey="id"
      filterDisplay="menu"
      emptyMessage="No items provided."
    >
      <Column
        field="col_number"
        header="Col No."
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_fabrics.${options.rowIndex}.col_number` as const}
            rules={{ required: 'Col no is required' }}
            render={({ field, fieldState }) => (
              <FormInputText
                {...field}
                placeholder="Number"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        )}
      />
      <Column
        field="color"
        header="Color"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_fabrics.${options.rowIndex}.color` as const}
            rules={{ required: 'Color is required' }}
            render={({ field, fieldState }) => (
              <FormInputText {...field} placeholder="Text" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        )}
      />
      <Column
        field="size_one"
        header="01"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_fabrics.${options.rowIndex}.size_one` as const}
            rules={{ required: 'Size 01 is required' }}
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
        field="size_two"
        header="02"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_fabrics.${options.rowIndex}.size_two` as const}
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
        field="size_three"
        header="03"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_fabrics.${options.rowIndex}.size_three` as const}
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
        field="size_four"
        header="04"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_fabrics.${options.rowIndex}.size_four` as const}
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
        field="size_five"
        header="05"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_fabrics.${options.rowIndex}.size_five` as const}
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
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
};

export default FormStyleFabricTable;
