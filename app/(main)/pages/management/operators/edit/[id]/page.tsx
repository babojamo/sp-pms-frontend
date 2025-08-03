'use client';
import React, { useCallback, useEffect, useState } from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { OperatorForm } from '@/app/types/operator';
import { OperatorService } from '@/app/services/OperatorService';
import { SelectItem } from 'primereact/selectitem';
import FormOperator from '@/app/components/operators/FormOperator';

interface EditOperatorPageProps {
  params?: { id: any };
}

const EditOperatorPage = ({ params }: EditOperatorPageProps) => {
  const router = useRouter();
  const [operator, setOperator] = useState<OperatorForm | undefined>();

  const lines: SelectItem[] = [
    { label: 'Line 1', value: '1' },
    { label: 'Line 3', value: '2' },
    { label: 'Line 4', value: '3' }
  ];

  const getOperator = useCallback(async () => {
    setOperator((await OperatorService.getOperator(params?.id)) as OperatorForm);
  }, [params?.id]);

  useEffect(() => {
    if (params?.id) {
      getOperator();
    }
  }, [params?.id, getOperator]);

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard title="Edit Operator" toolbar={<PageAction actionBack={() => router.push(ROUTES.OPERATORS.INDEX)} actions={[PageActions.BACK]} />}>
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormOperator lines={lines} value={operator} onSubmit={() => {}}>
                  <FormAction actionCancel={() => router.push(ROUTES.OPERATORS.INDEX)} actions={[FormActions.CANCEL, FormActions.UPDATE]} />
                </FormOperator>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default EditOperatorPage;
