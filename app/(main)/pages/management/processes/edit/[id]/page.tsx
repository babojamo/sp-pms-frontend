'use client';
import React, { useCallback, useEffect, useState } from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { ProcessService } from '@/app/services/ProcessService';
import { ProcessForm } from '@/app/types/process';
import FormProcess from '@/app/components/processes/FormProcess';

interface EditProcessPageProps {
  params?: { id: any };
}

const EditProcessPage = ({ params }: EditProcessPageProps) => {
  const router = useRouter();
  const [process, setProcess] = useState<ProcessForm | undefined>();

  const getProcess = useCallback(async () => {
    setProcess((await ProcessService.getProcess(params?.id)) as ProcessForm);
  }, [params?.id]);

  useEffect(() => {
    if (params?.id) {
      getProcess();
    }
  }, [params?.id, getProcess]);

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard title="Edit Process" toolbar={<PageAction actionBack={() => router.push(ROUTES.PROCESS.INDEX)} actions={[PageActions.BACK]} />}>
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormProcess value={process} onSubmit={() => {}}>
                  <FormAction actionCancel={() => router.push(ROUTES.PROCESS.INDEX)} actions={[FormActions.CANCEL, FormActions.UPDATE]} />
                </FormProcess>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default EditProcessPage;
