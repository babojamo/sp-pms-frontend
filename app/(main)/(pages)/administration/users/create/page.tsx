'use client';
import React, { useContext } from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { SelectItem } from 'primereact/selectitem';
import { useRouter } from 'next/navigation';
import FormUser from '@/app/components/users/FormUser';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import UserService from '@/app/services/UserService';
import { LayoutContext, LayoutProvider } from '@/layout/context/layoutcontext';
import type { AxiosError } from 'axios';

const CreateUserPage = () => {
  const router = useRouter();
  const userTypes: SelectItem[] = [
    { label: 'Operator', value: 'operator' },
    { label: 'Administrator', value: 'administrator' },
    { label: 'Administrator', value: 'manager' }
  ];

  const { showApiError } = useContext(LayoutContext);

  const handleSubmit = async (payload: any) => {
    try {
      const data = await UserService.createUser({
        email: payload.email,
        name: payload.name,
        password: payload.password,
        role: payload.user_type,
        username: payload.username,
        status: 'active'
      });
    } catch (error: any) {
      showApiError(error, 'Failed to create user');
    }
  };

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard title="Create User" toolbar={<PageAction actionBack={() => router.push(ROUTES.USERS.INDEX)} actions={[PageActions.BACK]} />}>
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormUser userTypes={userTypes} onSubmit={handleSubmit}>
                  <FormAction actionCancel={() => router.push(ROUTES.USERS.INDEX)} actions={[FormActions.CANCEL, FormActions.SAVE]} />
                </FormUser>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default CreateUserPage;
