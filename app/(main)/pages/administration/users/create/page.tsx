'use client';
import React from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { SelectItem } from 'primereact/selectitem';
import { useRouter } from 'next/navigation';
import FormUser from '@/app/components/users/FormUser';

const CreateUserPage = () => {

  const router = useRouter();

  const styleOptions: SelectItem[] = [
    { label: 'Type 1', value: 'type-1' }
  ];

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard
          title='Create User'
          toolbar={
            <PageAction
              actionBack={() => router.push(ROUTES.USERS.INDEX)}
              actions={[PageActions.BACK]}
            />
          }
        >
          <div className='grid'>
            <div className='col-12'>
              <div className='p-fluid'>
                <FormUser styleOptions={styleOptions} />
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default CreateUserPage;
