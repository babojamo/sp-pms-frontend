'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useCallback, useEffect, useState } from 'react';
import type { Demo } from '@/types';
import PageCard from '@/app/components/page-card/component';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/constants/routes';
import Modal from '@/app/components/modal/component';
import { User } from '@/app/types/users';
import UserService from '@/app/services/UserService';
import { EMPTY_TABLE_MESSAGE } from '@/app/constants';
import PageHeader from '@/app/components/page-header/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import TableHeader from '@/app/components/table-header/component';

interface UserPageState {
  deleteModalShow?: boolean;
}

interface SearchFilter {
  keyword?: string;
}

const UsersPage = () => {
  const [pageState, setPageState] = useState<UserPageState>({});
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<SearchFilter>({});

  const router = useRouter();

  const clearFilter1 = () => {
    setFilter({
      keyword: ''
    });
    fetchUsers();
  };

  const renderHeader = () => {
    return <TableHeader onClear={clearFilter1} />;
  };

  const fetchUsers = useCallback(async () => {
    const { data } = await UserService.getUsers();
    setUsers(getUsers(data.data));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const getUsers = (data: User[]) => {
    return [...(data || [])].map((d) => {
      return d;
    });
  };

  const formatDate = (value: Date) => {
    return value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const dateBodyTemplate = (rowData: User) => {
    return formatDate(new Date(rowData.created_at));
  };

  const statusBodyTemplate = (rowData: Demo.Customer) => {
    return <span className={`user-badge status-${rowData.status}`}>{rowData.status}</span>;
  };

  const toolbars = () => {
    return (
      <>
        <Button label="New" onClick={() => router.push(ROUTES.USERS.CREATE)} icon="pi pi-plus" style={{ marginRight: '.5em' }} />
      </>
    );
  };

  const onActionEditClick = (id: string | number) => {
    router.push(`${ROUTES.USERS.EDIT}/${id}`);
  };

  const onActionDeleteClick = () => {
    setPageState({
      ...pageState,
      deleteModalShow: true
    });
  };

  const actionBodyTemplate = (rowData: User) => {
    return (
      <>
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(rowData.id)} severity="warning" className="mr-2" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick()} severity="danger" />
      </>
    );
  };

  return (
    <>
      <PageHeader titles={['Administration', 'Users']}>
        <PageAction actionAdd={() => router.push(ROUTES.USERS.CREATE)} actions={[PageActions.ADD]} />
      </PageHeader>
      <DataTable
        value={users}
        paginator
        className="p-datatable-gridlines"
        showGridlines
        rows={10}
        dataKey="id"
        filterDisplay="menu"
        loading={loading}
        responsiveLayout="scroll"
        emptyMessage={EMPTY_TABLE_MESSAGE}
        header={renderHeader()}
      >
        <Column field="id" header="ID" style={{ minWidth: '12rem' }} />
        <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
        <Column field="username" header="Username" style={{ minWidth: '12rem' }} />
        <Column field="role" header="Role" style={{ minWidth: '10rem' }} body={(user: User) => user.role.toUpperCase()} />
        <Column header="Create By" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} />
        <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} />
        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
      </DataTable>
      <Modal
        title="Delete Record"
        visible={pageState.deleteModalShow}
        onHide={() => setPageState({ ...pageState, deleteModalShow: false })}
        confirmSeverity="danger"
      >
        <p>Are you sure you want to delete the record?</p>
      </Modal>
    </>
  );
};

export default UsersPage;
