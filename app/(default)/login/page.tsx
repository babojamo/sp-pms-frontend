/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { LayoutContext } from '@/layout/context/layoutcontext';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthService from '@/app/services/AuthService';
import { useAuth } from '@/app/contexts/useAuth';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

const LoginPage = () => {
  const [checked, setChecked] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);

  const { login } = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm({
    resolver: yupResolver(schema)
  });

  const router = useRouter();
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

  const onSubmit = async (e: { username: string; password: string }) => {
    await login(e.password, e.password, checked);
  };

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sun Pleats logo" className="mb-5 w-6rem flex-shrink-0" />
        <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username" className="block text-900 text-xl font-medium mb-2">
              {errors.username ? <span className="text-red-500">{errors.username?.message}</span> : `User`}
            </label>
            <InputText id="username" {...register('username')} type="text" placeholder="Email address or username" className={`w-full md:w-30rem mb-5` + (errors.username ? ' p-invalid' : '')} style={{ padding: '1rem' }} />
            <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
              {errors.password ? <span className="text-red-500">{errors.password?.message}</span> : `Password`}
            </label>
            <InputText {...register('password')} className={`w-full mb-5` + (errors.username ? ' p-invalid' : '')} placeholder="Password" type="password" autoComplete="false"></InputText>
            <div className="flex align-items-center justify-content-between mb-5 gap-5">
              <div className="flex align-items-center">
                <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                <label htmlFor="rememberme1">Remember me</label>
              </div>
              <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                Forgot password?
              </a>
            </div>
            <Button label="Sign In" className="w-full p-3 text-xl" type="submit"></Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
