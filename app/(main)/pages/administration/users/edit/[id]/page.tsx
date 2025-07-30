'use client';
import React, { useEffect, useState } from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import FormUser from '@/app/components/users/FormUser';
import { SelectItem } from 'primereact/selectitem';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { UserService } from '@/app/services/UserService';
import { UserForm } from '@/app/types/users';

interface EditUserPageProps {
    params?: { id: any };
}

const EditUserPage = ({ params }: EditUserPageProps) => {
    const router = useRouter();
    const [user, setUser] = useState<UserForm | undefined>();

    const userTypes: SelectItem[] = [
        { label: 'Operator', value: 'operator' },
        { label: 'Administrator', value: 'administrator' },
        { label: 'Administrator', value: 'manager' }
    ];
    useEffect(() => {
        if (params?.id) {
            getUser();
        }
    }, [params]);

    const getUser = async () => {
        setUser((await UserService.getUser(params?.id)) as UserForm);
    };

    return (
        <div className="grid">
            <div className="col-6">
                <PageCard title="Edit User" toolbar={<PageAction actionBack={() => router.push(ROUTES.USERS.INDEX)} actions={[PageActions.BACK]} />}>
                    <div className="grid">
                        <div className="col-12">
                            <div className="p-fluid">
                                <FormUser value={user} userTypes={userTypes} onSubmit={() => {}}>
                                    <FormAction actionCancel={() => router.push(ROUTES.USERS.INDEX)} actions={[FormActions.CANCEL, FormActions.UPDATE]} />
                                </FormUser>
                            </div>
                        </div>
                    </div>
                </PageCard>
            </div>
        </div>
    );
};

export default EditUserPage;
