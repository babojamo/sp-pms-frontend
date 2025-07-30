'use client';
import React, { useEffect, useState } from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { SelectItem } from 'primereact/selectitem';
import { DepartmentForm } from '@/app/types/department';
import { DepartmentService } from '@/app/services/DepartmentService';
import FormDepartment from '@/app/components/departments/FormDepartment';

interface EditDepartmentPageProps {
    params?: { id: any };
}

const EditDepartmentPage = ({ params }: EditDepartmentPageProps) => {
    const router = useRouter();
    const [department, setDepartment] = useState<DepartmentForm | undefined>();

    useEffect(() => {
        if (params?.id) {
            getDepartment();
        }
    }, [params]);

    const getDepartment = async () => {
        setDepartment((await DepartmentService.getDepartment(params?.id)) as DepartmentForm);
    };

    return (
        <div className="grid">
            <div className="col-6">
                <PageCard title="Edit Department" toolbar={<PageAction actionBack={() => router.push(ROUTES.DEPARTMENTS.INDEX)} actions={[PageActions.BACK]} />}>
                    <div className="grid">
                        <div className="col-12">
                            <div className="p-fluid">
                                <FormDepartment value={department} onSubmit={() => {}}>
                                    <FormAction actionCancel={() => router.push(ROUTES.DEPARTMENTS.INDEX)} actions={[FormActions.CANCEL, FormActions.UPDATE]} />
                                </FormDepartment>
                            </div>
                        </div>
                    </div>
                </PageCard>
            </div>
        </div>
    );
};

export default EditDepartmentPage;
