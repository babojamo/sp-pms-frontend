'use client';
import React, { useContext, useEffect, useState } from 'react';
import PageCard from '@/app/components/page-card/component';
import { SelectItem } from 'primereact/selectitem';
import FormStyle from '@/app/components/style/FormStyle';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/constants/routes';
import useUtilityData from '@/app/hooks/useUtilityData';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { useStylePage } from '../hooks/useStylePage';
import { LayoutContext } from '@/layout/context/layoutcontext';
import FormStyleItemTable from '@/app/components/style/FormStyleItemTable';
import { StyleItem } from '@/app/types/styles';

const CreateStylePage = () => {
  const router = useRouter();
  const { fetchItemTypes } = useUtilityData();
  const { showApiError, showSuccess } = useContext(LayoutContext);
  const { saveStyle, isSaveLoading } = useStylePage();
  const [styleItems, setStyleItems] = useState<StyleItem[]>([]);

  useEffect(() => {
    initData();
  }, [])

  const initData = async () => {
    //setItemTypes(await fetchItemTypes());
  }

  const styleOptions: SelectItem[] = [
    { label: 'Type 1', value: 'type-1' }
  ];

  const handleSubmit = async (e: any) => {
    try {
      await saveStyle(e, styleItems);
      showSuccess("Style successfully created.");
      setTimeout(() => {
        router.push(ROUTES.STYLES_INDEX);
      }, 2000);
    } catch (error: any) {
      showApiError(error, 'Failed to create style.');
    }
  }

  const handleItemChange = (items: StyleItem[]) => {
    setStyleItems(items);
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
            <FormStyle onSubmit={handleSubmit} styleOptions={styleOptions}  >

              <FormStyleItemTable onItemsChanged={handleItemChange}/>
              <div className='grid'>
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
