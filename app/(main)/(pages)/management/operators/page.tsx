'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { EMPTY_TABLE_MESSAGE } from '@/app/constants';
import { Operator } from '@/app/types/operator';
import { OperatorService } from '@/app/services/OperatorService';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import DataStatusIcon from '@/app/components/data-status-icon/component';
import Modal from '@/app/components/modal/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import PageHeader from '@/app/components/page-header/component';
import React, { useCallback, useEffect, useState } from 'react';
import TableHeader from '@/app/components/table-header/component';
import PageTile from '@/app/components/page-title/component';

interface OperatorPageState {
  deleteModalShow?: boolean;
}

interface SearchFilter {
  keyword?: string;
}

const OperatorsPage = () => {
  const [pageState, setPageState] = useState<OperatorPageState>({});
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SearchFilter>({});

  const router = useRouter();

  const clearFilter1 = () => {
    setFilter({
      keyword: ''
    });
    fetchOperators();
  };

  const renderHeader = () => {
    return <TableHeader onClear={clearFilter1} />;
  };

  const fetchOperators = useCallback(async () => {
    setLoading(true);
    const { data } = await OperatorService.getOperators();
    setOperators(getOperators(data.data ?? []));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOperators();
  }, [fetchOperators]);

  const getOperators = (data: Operator[]) => {
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

  const dateBodyTemplate = (rowData: Operator) => {
    return <span title={formatDate(new Date(rowData.created_at ?? ''))}>{rowData.created_by}</span>;
  };

  const onActionEditClick = (id: string | number) => {
    router.push(`${ROUTES.OPERATORS.EDIT}/${id}`);
  };

  const onActionDeleteClick = () => {
    setPageState({
      ...pageState,
      deleteModalShow: true
    });
  };

  const actionBodyTemplate = (rowData: Operator) => {
    return (
      <>
        <Button icon="pi pi-print" title="Print Process Codes" size="small" severity="success" className="mr-2" />
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(rowData.id)} size="small" severity="warning" className="mr-2" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick()} size="small" severity="danger" />
      </>
    );
  };

  const nameTemplate = (row: Operator) => {
    return (
      <span>
        <DataStatusIcon className="mr-2" status="active" />
        {row.name}
      </span>
    );
  };

  return (
    <>
      <PageTile title="Operators" icon="pi pi-fw pi-users" url={ROUTES.OPERATORS.INDEX} />
      <PageHeader titles={['Management', 'Operators']}>
        <PageAction actionAdd={() => router.push(ROUTES.OPERATORS.CREATE)} actions={[PageActions.ADD]} />
      </PageHeader>
      <DataTable
        value={operators}
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
        <Column header="Name" style={{ minWidth: '10rem' }} body={nameTemplate} />
        <Column field="section.name" header="Section" style={{ minWidth: '12rem' }} />
        <Column field="section.department.name" header="Department" style={{ minWidth: '12rem' }} />
        <Column field="line_id" header="Processes" style={{ minWidth: '12rem' }} />
        <Column header="Create" field="created_at" dataType="created_at" body={dateBodyTemplate} />
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

export default OperatorsPage;
