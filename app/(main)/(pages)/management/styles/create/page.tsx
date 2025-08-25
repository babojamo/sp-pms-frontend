'use client';
import { DefaultFormData } from '@/app/types/form';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { ROUTES } from '@/app/constants/routes';
import { SelectItem } from 'primereact/selectitem';
import { useRouter } from 'next/navigation';
import { useStylePage } from '../hooks/useStylePage';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import FormStyle from '@/app/components/style/FormStyle';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import PageCard from '@/app/components/page-card/component';
import React, { useContext, useEffect } from 'react';

const CreateStylePage = () => {
  const router = useRouter();
  const { showApiError, showSuccess } = useContext(LayoutContext);
  const { saveStyle, isSaveLoading } = useStylePage();

  useEffect(() => {
    initData();
  }, [])

  const initData = async () => {
    //setItemTypes(await fetchItemTypes());
  }

  const styleOptions: SelectItem[] = [
    { label: 'Type 1', value: 'type-1' }
  ];

  const handleSubmit = async (e: DefaultFormData) => {
    try {
      await saveStyle(e);
      showSuccess("Style successfully created.");
      setTimeout(() => {
        router.push(ROUTES.STYLES_INDEX);
      }, 2000);
    } catch (error: any) {
      showApiError(error, 'Failed to create style.');
    }
  }

  return (
    <PageCard
      title='Create Style'
      toolbar={
        <PageAction
          actionBack={() => router.push(ROUTES.STYLES_INDEX)}
          actions={[PageActions.BACK]}
        />
      }
    >
      <div className='grid'>
        <div className='col-12'>
          <div className='p-fluid'>
            <FormStyle onSubmit={handleSubmit} styleOptions={styleOptions}>
              <div className='grid mt-5'>
                <div className='ml-auto'>
                  <FormAction loadingSave={isSaveLoading} actionCancel={() => router.push(ROUTES.USERS.INDEX)} actions={[FormActions.CANCEL, FormActions.SAVE]} />
                </div>
              </div>
            </FormStyle>
          </div>
        </div>
      </div>
    </PageCard>
  );
};

export default CreateStylePage;
