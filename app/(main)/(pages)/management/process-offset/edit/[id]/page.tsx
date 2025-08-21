'use client';
import React, { useCallback, useEffect, useState } from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { SelectItem } from 'primereact/selectitem';
import { ProcessOffsetService } from '@/app/services/ProcessOffsetService';
import { ProcessOffsetForm } from '@/app/types/process-offset';
import FormProcessOffset from '@/app/components/process-offset/FormProcessOffset';

interface EditProcessOffsetPageProps {
  params?: { id: any };
}

const EditProcessOffsetPage = ({ params }: EditProcessOffsetPageProps) => {
  const router = useRouter();
  const [processOffset, setProcessOffset] = useState<ProcessOffsetForm | undefined>();

  const getProcessOffset = useCallback(async () => {
    setProcessOffset((await ProcessOffsetService.getProcessOffset(params?.id)) as ProcessOffsetForm);
  }, [params?.id]);

  useEffect(() => {
    if (params?.id) {
      getProcessOffset();
    }
  }, [params?.id, getProcessOffset]);

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard
          title="Edit ProcessOffset"
          toolbar={<PageAction actionBack={() => router.push(ROUTES.PROCESS_OFFSETS.INDEX)} actions={[PageActions.BACK]} />}
        >
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormProcessOffset value={processOffset} onSubmit={() => {}}>
                  <FormAction actionCancel={() => router.push(ROUTES.PROCESS_OFFSETS.INDEX)} actions={[FormActions.CANCEL, FormActions.UPDATE]} />
                </FormProcessOffset>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default EditProcessOffsetPage;
