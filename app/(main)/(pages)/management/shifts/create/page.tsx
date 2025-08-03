'use client';
import React from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { SelectItem } from 'primereact/selectitem';
import FormShift from '@/app/components/shifts/FormShift';

const CreateShiftPage = () => {
  const router = useRouter();
  const lines: SelectItem[] = [
    { label: 'Line 1', value: '1' },
    { label: 'Line 3', value: '2' },
    { label: 'Line 4', value: '3' }
  ];

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard title="Create Shift" toolbar={<PageAction actionBack={() => router.push(ROUTES.SHIFTS.INDEX)} actions={[PageActions.BACK]} />}>
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormShift>
                  <FormAction actionCancel={() => router.push(ROUTES.SHIFTS.INDEX)} actions={[FormActions.CANCEL, FormActions.SAVE]} />
                </FormShift>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default CreateShiftPage;
