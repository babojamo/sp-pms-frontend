'use client';

import React from 'react';
import PageCard from '@/app/components/page-card/component';
import { SelectItem } from 'primereact/selectitem';
import FormStyle from '@/app/components/style/FormStyle';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/constants/routes';

const EditStylePage = () => {
    const router = useRouter();

    const styleOptions: SelectItem[] = [{ label: 'Type 1', value: 'type-1' }];

    return (
        <div className="grid">
            <div className="col-6">
                <PageCard title="Edit Style" toolbar={<PageAction actionBack={() => router.push(ROUTES.DEPARTMENT_INDEX)} actions={[PageActions.BACK]} />}>
                    <div className="grid">
                        <div className="col-12">
                            <div className="p-fluid">
                                <FormStyle styleOptions={styleOptions} />
                            </div>
                        </div>
                    </div>
                </PageCard>
            </div>
        </div>
    );
};

export default EditStylePage;
