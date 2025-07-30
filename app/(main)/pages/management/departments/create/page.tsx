'use client';
import React from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { SelectItem } from 'primereact/selectitem';
import FormDepartment from '@/app/components/departments/FormDepartment';

const CreateDepartmentPage = () => {
  const router = useRouter();
  const lines: SelectItem[] = [
    { label: 'Line 1', value: '1' },
    { label: 'Line 3', value: '2' },
    { label: 'Line 4', value: '3' }
  ];

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard title="Create Department" toolbar={<PageAction actionBack={() => router.push(ROUTES.DEPARTMENTS.INDEX)} actions={[PageActions.BACK]} />}>
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormDepartment>
                  <FormAction actionCancel={() => router.push(ROUTES.DEPARTMENTS.INDEX)} actions={[FormActions.CANCEL, FormActions.SAVE]} />
                </FormDepartment>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default CreateDepartmentPage;
