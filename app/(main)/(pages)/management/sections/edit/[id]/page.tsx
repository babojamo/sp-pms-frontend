'use client';
import React, { useContext, useCallback, useEffect, useState } from 'react';
import { LayoutContext } from '@/layout/context/layoutcontext';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { SelectItem } from 'primereact/selectitem';
import { SectionForm } from '@/app/types/section';
import { SectionService } from '@/app/services/SectionService';
import FormSection from '@/app/components/sections/FormSection';
import useUtilityData from '@/app/hooks/useUtilityData';
import { useSectionPage } from '../../hooks/useSectionPage';

interface EditSectionPageProps {
  params?: { id: any };
}

const EditSectionPage = ({ params }: EditSectionPageProps) => {
  const router = useRouter();
  const [departmentOption, setDepartmentOption] = useState<SelectItem[]>([]);
  const { updateSection, isSaveLoading } = useSectionPage();
  const [ Section, setSection ] = useState<SectionForm | undefined>();
  const { showApiError, showSuccess } = useContext(LayoutContext);
  const { fetchDepartmentOptions, isDepartmentLoading } = useUtilityData();

  const getSection = useCallback(async () => {
    const response = await SectionService.getSection(params?.id);
    setSection(response.data as SectionForm);
  }, [params?.id]);

  const handleSubmit = async (data: SectionForm) => {
    try {
      await updateSection(params?.id as string, data);
      showSuccess('Section offset successfully created.');
      setTimeout(() => {
        router.push(ROUTES.SECTION.INDEX);
      }, 2000);
    } catch (error: any) {
      showApiError(error, 'Failed to process offset.');
    }
    console.log('handleSubmit', data);
  };
  
  const initData = async () => {
    setDepartmentOption(await fetchDepartmentOptions());
  };

  useEffect(() => {
    if (params?.id) {
      getSection();
    }
  }, [params?.id, getSection]);

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard title="Edit Section" toolbar={<PageAction actionBack={() => router.push(ROUTES.SECTION.INDEX)} actions={[PageActions.BACK]} />}>
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormSection value={Section} onSubmit={handleSubmit} loading={{ deparmentField: isDepartmentLoading }} departments={departmentOption}>
                  <FormAction 
                        loadingSave={isSaveLoading} actionCancel={() => router.push(ROUTES.SECTION.INDEX)} actions={[FormActions.CANCEL, FormActions.UPDATE]} />
                </FormSection>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default EditSectionPage;
