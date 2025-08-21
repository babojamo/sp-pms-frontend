'use client';
import React, { useContext } from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import FormSewingLine from '@/app/components/sewing-lines/FormSewingLine';
import { DefaultFormData } from '@/app/types/form';
import { useSewingLinePage } from '../hooks/useSewingLinePage';
import { LayoutContext } from '@/layout/context/layoutcontext';

const CreateSewingLinePage = () => {
  const router = useRouter();

  const { saveSewingLine, isSaveLoading } = useSewingLinePage();
  const { showApiError, showSuccess } = useContext(LayoutContext);

  const handleSubmit = async (data: DefaultFormData) => {
    try {
      await saveSewingLine(data);
      showSuccess('SewingLine offset successfully created.');
      setTimeout(() => {
        router.push(ROUTES.SEWING_LINES.INDEX);
      }, 2000);
    } catch (error: any) {
      showApiError(error, 'Failed to process offset.');
    }
  };

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard
          title="Create Sewing Line"
          toolbar={<PageAction actionBack={() => router.push(ROUTES.SEWING_LINES.INDEX)} actions={[PageActions.BACK]} />}
        >
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormSewingLine onSubmit={handleSubmit}>
                  <div className="grid">
                    <div className="ml-auto">
                      <FormAction
                        loadingSave={isSaveLoading}
                        actionCancel={() => router.push(ROUTES.SEWING_LINES.INDEX)}
                        actions={[FormActions.CANCEL, FormActions.SAVE]}
                      />
                    </div>
                  </div>
                </FormSewingLine>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default CreateSewingLinePage;
