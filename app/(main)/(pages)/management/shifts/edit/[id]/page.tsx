'use client';
import React, { useCallback, useEffect, useState } from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { SelectItem } from 'primereact/selectitem';
import { ShiftForm } from '@/app/types/shift';
import { ShiftService } from '@/app/services/ShiftService';
import FormShift from '@/app/components/shifts/FormShift';

interface EditShiftPageProps {
  params?: { id: any };
}

const EditShiftPage = ({ params }: EditShiftPageProps) => {
  const router = useRouter();
  const [shift, setShift] = useState<ShiftForm | undefined>();

  const getShift = useCallback(async () => {
    setShift((await ShiftService.getShift(params?.id)) as ShiftForm);
  }, [params?.id]);

  useEffect(() => {
    if (params?.id) {
      getShift();
    }
  }, [params?.id, getShift]);

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard title="Edit Shift" toolbar={<PageAction actionBack={() => router.push(ROUTES.SHIFTS.INDEX)} actions={[PageActions.BACK]} />}>
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormShift value={shift} onSubmit={() => {}}>
                  <FormAction actionCancel={() => router.push(ROUTES.SHIFTS.INDEX)} actions={[FormActions.CANCEL, FormActions.UPDATE]} />
                </FormShift>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default EditShiftPage;
