'use client';
import React, { useEffect, useState } from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { SelectItem } from 'primereact/selectitem';
import { SewingLineForm } from '@/app/types/sewing-line';
import { SewingLineService } from '@/app/services/SewingLineService';
import FormSewingLine from '@/app/components/sewing-lines/FormSewingLine';

interface EditSewingLinePageProps {
    params?: { id: any };
}

const EditSewingLinePage = ({ params }: EditSewingLinePageProps) => {
    const router = useRouter();
    const [sewingLine, setSewingLine] = useState<SewingLineForm | undefined>();

    const lines: SelectItem[] = [
        { label: 'Line 1', value: '1' },
        { label: 'Line 3', value: '2' },
        { label: 'Line 4', value: '3' }
    ];

    useEffect(() => {
        if (params?.id) {
            getSewingLine();
        }
    }, [params]);

    const getSewingLine = async () => {
        setSewingLine((await SewingLineService.getSewingLine(params?.id)) as SewingLineForm);
    };

    return (
        <div className="grid">
            <div className="col-6">
                <PageCard title="Edit Sewing Line" toolbar={<PageAction actionBack={() => router.push(ROUTES.SEWING_LINES.INDEX)} actions={[PageActions.BACK]} />}>
                    <div className="grid">
                        <div className="col-12">
                            <div className="p-fluid">
                                <FormSewingLine value={sewingLine} onSubmit={() => {}}>
                                    <FormAction actionCancel={() => router.push(ROUTES.SEWING_LINES.INDEX)} actions={[FormActions.CANCEL, FormActions.UPDATE]} />
                                </FormSewingLine>
                            </div>
                        </div>
                    </div>
                </PageCard>
            </div>
        </div>
    );
};

export default EditSewingLinePage;
