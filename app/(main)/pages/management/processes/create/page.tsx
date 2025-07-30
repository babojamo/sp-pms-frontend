'use client';
import React from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import FormProcess from '@/app/components/processes/FormProcess';

const CreateProcessPage = () => {
    const router = useRouter();

    return (
        <div className="grid">
            <div className="col-6">
                <PageCard title="Create Process" toolbar={<PageAction actionBack={() => router.push(ROUTES.PROCESS.INDEX)} actions={[PageActions.BACK]} />}>
                    <div className="grid">
                        <div className="col-12">
                            <div className="p-fluid">
                                <FormProcess>
                                    <FormAction actionCancel={() => router.push(ROUTES.PROCESS.INDEX)} actions={[FormActions.CANCEL, FormActions.SAVE]} />
                                </FormProcess>
                            </div>
                        </div>
                    </div>
                </PageCard>
            </div>
        </div>
    );
};

export default CreateProcessPage;
