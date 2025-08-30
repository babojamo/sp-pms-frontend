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
import { Department } from '@/app/types/department';
import { DepartmentService } from '@/app/services/DepartmentService';
import PageHeader from '@/app/components/page-header/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import TableHeader from '@/app/components/table-header/component';
import { EMPTY_TABLE_MESSAGE } from '@/app/constants';
import PageTile from '@/app/components/page-title/component';

interface DepartmentPageState {
  deleteModalShow?: boolean;
}

interface SearchFilter {
  keyword?: string;
}

const DepartmentsPage = () => {
  const [pageState, setPageState] = useState<DepartmentPageState>({});
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SearchFilter>({});

  const router = useRouter();

  const clearFilter1 = () => {
    setFilter({
      keyword: ''
    });
    fetchDepartments();
  };

  const renderHeader = () => {
    return <TableHeader onClear={clearFilter1} />;
  };

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    const { data } = await DepartmentService.getDepartmentes();
    setDepartments(getDepartments(data.data ?? []));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const getDepartments = (data: Department[]) => {
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

  const dateBodyTemplate = (rowData: Department) => {
    return formatDate(new Date(rowData.created_at));
  };

  const onActionEditClick = (id: string | number) => {
    router.push(`${ROUTES.DEPARTMENTS.EDIT}/${id}`);
  };

  const onActionDeleteClick = () => {
    setPageState({
      ...pageState,
      deleteModalShow: true
    });
  };

  const actionBodyTemplate = (rowData: Department) => {
    return (
      <>
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(rowData.id)} size="small" severity="warning" className="mr-2" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick()} size="small" severity="danger" />
      </>
    );
  };

  return (
    <>
      <PageTile title="Departments" icon="pi pi-fw pi-building" url={ROUTES.DEPARTMENTS.INDEX} />
      <PageHeader titles={['Management', 'Departments']}>
        <PageAction actionAdd={() => router.push(ROUTES.DEPARTMENTS.CREATE)} actions={[PageActions.ADD]} />
      </PageHeader>
      <DataTable
        value={departments}
        paginator
        className="p-datatable-gridlines"
        showGridlines
        rows={10}
        dataKey="id"
        filterDisplay="menu"
        loading={loading}
        emptyMessage={EMPTY_TABLE_MESSAGE}
        header={renderHeader()}
      >
        <Column field="id" header="ID" style={{ minWidth: '12rem' }} />
        <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
        <Column header="Create At" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} />
        <Column body={actionBodyTemplate} header="Actions"></Column>
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

export default DepartmentsPage;
