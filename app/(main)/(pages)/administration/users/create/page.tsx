'use client';
import React from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { SelectItem } from 'primereact/selectitem';
import { useRouter } from 'next/navigation';
import FormUser from '@/app/components/users/FormUser';
import FormAction, { FormActions } from '@/app/components/form-action/component';

const CreateUserPage = () => {
  const router = useRouter();

  const userTypes: SelectItem[] = [
    { label: 'Operator', value: 'operator' },
    { label: 'Administrator', value: 'administrator' },
    { label: 'Administrator', value: 'manager' }
  ];

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard title="Create User" toolbar={<PageAction actionBack={() => router.push(ROUTES.USERS.INDEX)} actions={[PageActions.BACK]} />}>
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormUser userTypes={userTypes}>
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
