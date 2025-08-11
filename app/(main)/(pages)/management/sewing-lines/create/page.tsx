'use client';
import React from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import FormSewingLine from '@/app/components/sewing-lines/FormSewingLine';

const CreateSewingLinePage = () => {
  const router = useRouter();

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
                <FormSewingLine>
                  <FormAction actionCancel={() => router.push(ROUTES.SEWING_LINES.INDEX)} actions={[FormActions.CANCEL, FormActions.SAVE]} />
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
