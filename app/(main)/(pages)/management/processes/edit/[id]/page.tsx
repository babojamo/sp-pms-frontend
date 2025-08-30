'use client';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { ProcessForm } from '@/app/types/process';
import { ProcessService } from '@/app/services/ProcessService';
import { ROUTES } from '@/app/constants/routes';
import { useProcessPage } from '../../hooks/useProcessPage';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import FormProcess from '@/app/components/processes/FormProcess';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import PageCard from '@/app/components/page-card/component';
import React, { useContext, useCallback, useEffect, useState } from 'react';

interface EditProcessPageProps {
  params?: { id: any };
}

const EditProcessPage = ({ params }: EditProcessPageProps) => {
  const router = useRouter();
  const { updateProcess, isSaveLoading } = useProcessPage();
  const { showApiError, showSuccess } = useContext(LayoutContext);
  const [process, setProcess] = useState<ProcessForm | undefined>();

  const getProcess = useCallback(async () => {
    setProcess((await ProcessService.getProcess(params?.id)).data as ProcessForm);
  }, [params?.id]);

  const handleSubmit = async (data: ProcessForm) => {
    try {
      await updateProcess(params?.id as string, data);
      showSuccess('Process successfully created.');
    } catch (error: any) {
      showApiError(error, 'Failed to save process.');
    }
    console.log('handleSubmit', data);
  };

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
                <FormProcess value={process} onSubmit={handleSubmit}>
                  <FormAction
                    loadingSave={isSaveLoading}
                    actionCancel={() => router.push(ROUTES.PROCESS.INDEX)}
                    actions={[FormActions.CANCEL, FormActions.UPDATE]}
                  />
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
