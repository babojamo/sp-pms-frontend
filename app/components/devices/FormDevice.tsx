'use client';

import FormInputText from '../form/input-text/component';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RadioButton } from 'primereact/radiobutton';
import { CachedDevice, DeviceForm } from '@/app/types/device';
import { SelectItem } from 'primereact/selectitem';
import FormMultiDropdown from '../form/multi-dropdown/component';

interface FormDeviceProps {
  value?: DeviceForm;
  onSubmit?: any;
  children?: any;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  operator_ids: yup.array().of(yup.string()).min(1, 'Operators is required') // ensures at least one entry
});

const FormDevice = ({ value, onSubmit, children }: FormDeviceProps) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  });

  const cachedDevices: CachedDevice[] = [
    { remarks: 'Device 1', device_id: 'A' },
    { remarks: 'Device 2', device_id: 'M' },
    { remarks: 'Device 3', device_id: 'P' },
    { remarks: 'Device 4', device_id: 'R' }
  ];
  const [selectedCachedDevice, setSelectedCachedDevice] = useState<CachedDevice | undefined>();
  const [operatorOptions, setOperatorOptions] = useState<SelectItem[]>([
    { label: 'Operator 1', value: '1' },
    { label: 'Operator 2', value: '1' }
  ]);

  useEffect(() => {
    if (value) {
      reset({
        name: value?.name
      });
    }
  }, [value, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputText {...register('name')} label="Name" placeholder="Device name" errorMessage={errors.name?.message} isError={errors.name ? true : false} />
      <FormMultiDropdown {...register('operator_ids')} filter placeholder="Choose Operators" errorMessage={errors.name?.message} isError={errors.name ? true : false} options={operatorOptions} />
      <p>Choose to Unregisted Devices</p>
      <div className="card flex">
        <div className="flex flex-column gap-3">
          {cachedDevices.map((cachedDevice) => {
            return (
              <div key={cachedDevice.device_id} className="flex align-items-center">
                <RadioButton inputId={cachedDevice.device_id} name="cached_devices" value={cachedDevice} onChange={(e) => setSelectedCachedDevice(e.value)} checked={selectedCachedDevice?.device_id === cachedDevice.device_id} />
                <label htmlFor={cachedDevice.device_id} className="ml-2">
                  {cachedDevice.remarks}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {children}
    </form>
  );
};

export default FormDevice;
