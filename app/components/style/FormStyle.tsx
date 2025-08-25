'use client';

import { Controller, useForm } from 'react-hook-form';
import { DefaultFormData } from '@/app/types/form';
import { generateSimpleId } from '@/app/utils';
import { SelectItem } from 'primereact/selectitem';
import { FormStyleFabric, StyleItem } from '@/app/types/styles';
import FormCalendar from '../form/calendar/component';
import FormInputText from '../form/input-text/component';
import FormStyleItemTable from './FormStyleItemTable';
import FormStyleFabricTable from './FormStyleFabricTable';

interface FormStyleProps {
  styleOptions: SelectItem[];
  itemTypes?: SelectItem[];
  onSubmit?: any;
  children?: any;
}

interface FormData extends DefaultFormData {
  control_number: string;
  buyer_name: string;
  style_number: string;
  pleats_name?: string | null;
  item_type?: string | null;
  ship_date_from_japan?: string | null; // ISO date string: "YYYY-MM-DD"
  ship_date_from_cebu?: string | null; // ISO date string
  noumae?: string | null;
  sample?: string | null;
  pattern?: string | null;
  name?: string;
  style_items: StyleItem[];
  style_fabrics: FormStyleFabric[];
}

const FormStyle = ({ onSubmit, children }: FormStyleProps) => {
  const emptyStyleItem = (): StyleItem => ({
    id: generateSimpleId(),
    item_name: '',
    item_number: '',
    specs_qty: 0,
    specs_unit: '',
    youjyaku_qty: 0,
    youjyaku_unit: '',
    color_detail: ''
  });

  const emptyStyleFabric = (): FormStyleFabric => ({
    id: generateSimpleId(),
    col_number: '',
    color: '',
    size_one: 0,
    size_two: 0,
    size_three: 0,
    size_four: 0,
    size_five: 0,
    total: 0
  });

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      control_number: '',
      buyer_name: '',
      style_number: '',
      pleats_name: '',
      item_type: '',
      ship_date_from_japan: '', // ISO date string: "YYYY-MM-DD"
      ship_date_from_cebu: '', // ISO date string
      noumae: '',
      sample: '',
      pattern: '',
      name: '',
      style_items: [emptyStyleItem()],
      style_fabrics: [emptyStyleFabric()]
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid">
        <div className="col-12 md:col-3">
          <Controller
            name="control_number"
            control={control}
            rules={{ required: 'Control number is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Control #" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
        <div className="col-12 md:col-3">
          <Controller
            name="buyer_name"
            control={control}
            rules={{ required: 'Buyer name is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Buyer Name" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
      </div>

      <div className="grid">
        <div className="col-12 md:col-3">
          <Controller
            name="style_number"
            control={control}
            rules={{ required: 'Style number is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Style #" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
        <div className="col-12 md:col-3">
          <Controller
            name="pleats_name"
            control={control}
            rules={{ required: 'Pleats name is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Pleats Name" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
      </div>

      <div className="grid">
        <div className="col-12 md:col-3">
          <Controller
            name="item_type"
            control={control}
            rules={{ required: 'Item is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Item" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
        <div className="col-12 md:col-3"></div>
      </div>

      <div className="grid">
        <div className="col-12 md:col-3">
          <Controller
            name="ship_date_from_cebu"
            control={control}
            rules={{ required: 'Pleats name is required' }}
            render={({ fieldState, field }) => (
              <FormCalendar
                {...field}
                label="Ship Date form Cebu"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        </div>
        <div className="col-12 md:col-3">
          <Controller
            name="ship_date_from_japan"
            control={control}
            rules={{ required: 'Pleats name is required' }}
            render={({ fieldState, field }) => (
              <FormCalendar
                {...field}
                label="Ship Date form Japan"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        </div>
      </div>

      <div className="grid">
        <div className="col-12 md:col-3">
          <Controller
            name="noumae"
            control={control}
            rules={{ required: 'Noumae name is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Noumae" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
        <div className="col-12 md:col-3">
          <Controller
            name="sample"
            control={control}
            rules={{ required: 'Sample name is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Sample" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
      </div>

      <div className="grid">
        <div className="col-12 md:col-3">
          <Controller
            name="pattern"
            control={control}
            rules={{ required: 'Pattern name is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Pattern" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
      </div>
      <FormStyleItemTable control={control} />
      <div className='m-5'></div>
      <FormStyleFabricTable control={control} />
      {children}
    </form>
  );
};

export default FormStyle;
