'use client';
import React, { useCallback, useEffect, useState } from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { SelectItem } from 'primereact/selectitem';
import { SectionForm } from '@/app/types/section';
import { SectionService } from '@/app/services/SectionService';
import FormSection from '@/app/components/sections/FormSection';

interface EditSectionPageProps {
  params?: { id: any };
}

const EditSectionPage = ({ params }: EditSectionPageProps) => {
  const router = useRouter();
  const [Section, setSection] = useState<SectionForm | undefined>();

  const lines: SelectItem[] = [
    { label: 'Line 1', value: '1' },
    { label: 'Line 3', value: '2' },
    { label: 'Line 4', value: '3' }
  ];

  const getSection = useCallback(async () => {
    setSection((await SectionService.getSection(params?.id)) as SectionForm);
  }, [params?.id]);

  useEffect(() => {
    if (params?.id) {
      getSection();
    }
  }, [params?.id, getSection]);

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard
          title="Edit Section"
          toolbar={<PageAction actionBack={() => router.push(ROUTES.SECTION.INDEX)} actions={[PageActions.BACK]} />}
        >
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormSection value={Section} onSubmit={() => {}}>
                  <FormAction actionCancel={() => router.push(ROUTES.SECTION.INDEX)} actions={[FormActions.CANCEL, FormActions.UPDATE]} />
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
