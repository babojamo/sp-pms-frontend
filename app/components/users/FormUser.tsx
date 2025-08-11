'use client';

import { SelectItem } from 'primereact/selectitem';
import FormDropdown from '../form/dropdown/component';
import FormInputText from '../form/input-text/component';
import { UserForm } from '@/app/types/users';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormUserProps {
  userTypes: SelectItem[];
  value?: UserForm;
  onSubmit?: any;
  children?: any;
}

type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
  user_type: string;
};

const FormUser = ({ userTypes = [], value, onSubmit, children }: FormUserProps) => {
  const { control, handleSubmit, reset } = useForm<FormData>();

  // const {
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   reset,
  //   register,
  //   setValue
  // } = useForm({
  //   resolver: yupResolver(schema)
  // });

  useEffect(() => {
    if (value) {
      reset({
        name: value?.name,
        username: value?.username,
        password: '',
        user_type: value?.type
      });
    }
  }, [value]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <FormInputText {...register('name')} label="Employee Name" errorMessage={errors.name?.message} isError={errors.name ? true : false} />
      <FormInputText {...register('email')} label="Email" type="email" errorMessage={errors.email?.message} isError={errors.email ? true : false} />
      <FormInputText {...register('username')} label="Username" errorMessage={errors.username?.message} isError={errors.username ? true : false} />
      <FormInputText {...register('password')} label="Password" errorMessage={errors.password?.message} isError={errors.password ? true : false} /> */}

      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ fieldState }) => (
          <FormInputText label="Employee Name" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{ required: 'Email is required' }}
        render={({ fieldState }) => (
          <FormInputText label="Email" type="email" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
        )}
      />

      <Controller
        name="username"
        control={control}
        rules={{ required: 'Username is required' }}
        render={({ fieldState }) => (
          <FormInputText label="Username" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: 'Password is required' }}
        render={({ fieldState }) => (
          <FormInputText label="Password" type="password" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
        )}
      />
      <Controller
        name="user_type"
        control={control}
        rules={{ required: 'Role is required' }}
        render={({ field, fieldState }) => (
          <FormDropdown
            value={field.value}
            onChange={(e: any) => field.onChange(e.value)}
            label="User Type"
            errorMessage={fieldState.error?.message}
            isError={fieldState.error ? true : false}
            options={userTypes}
          />
        )}
      />

      {children}
    </form>
  );
};

export default FormUser;
