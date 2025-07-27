'use client';

import { SelectItem } from "primereact/selectitem";
import FormDropdown from "../form/dropdown/component";
import FormInputText from "../form/input-text/component";
import { UserForm } from "@/app/types/users";
import { useEffect } from "react";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormUserProps {
  userTypes: SelectItem[],
  value?: UserForm
  onSubmit?: any;
  children?: any;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  user_type: yup.string().required('User type is required'),
});

const FormUser = ({ userTypes = [], value, onSubmit, children }: FormUserProps) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (value) {
      reset({
        name: value?.name,
        username: value?.username,
        password: '',
        user_type: value?.type,
      })
    }
  }, [value])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputText {...register('name')} label='Employee Name' errorMessage={errors.name?.message} isError={errors.name ? true : false} />
      <FormInputText {...register('username')} label='Username' errorMessage={errors.username?.message} isError={errors.username ? true : false} />
      <FormInputText {...register('password')} label='Password' errorMessage={errors.password?.message} isError={errors.password ? true : false} />
      <FormDropdown {...register('user_type')} label='User Type' errorMessage={errors.user_type?.message} isError={errors.user_type ? true : false} options={userTypes} />
      {children}
    </form>
  );
}


export default FormUser;