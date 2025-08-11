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
import { Operator } from '@/app/types/operator';
import { OperatorService } from '@/app/services/OperatorService';
import DataStatusIcon from '@/app/components/data-status-icon/component';

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

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      keyword: value
    });
    fetchOperators();
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter1} />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={filter.keyword} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    );
  };

  const fetchOperators = useCallback(async () => {
    setLoading(true);
    const data = await OperatorService.getOperators();
    setOperators(getOperators(data));
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

  const statusBodyTemplate = (rowData: Demo.Customer) => {
    return <span className={`operator-badge status-${rowData.status}`}>{rowData.status}</span>;
  };

  const toolbars = () => {
    return (
      <>
        <Button label="New" onClick={() => router.push(ROUTES.OPERATORS.CREATE)} icon="pi pi-plus" style={{ marginRight: '.5em' }} />
      </>
    );
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
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(rowData.id)} rounded severity="warning" className="mr-2" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick()} rounded severity="danger" />
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
    <div className="grid">
      <div className="col-12">
        <PageCard title="Operators Management" toolbar={toolbars()}>
          <DataTable
            value={operators}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="id"
            filterDisplay="menu"
            loading={loading}
            responsiveLayout="scroll"
            emptyMessage="No customers found."
            header={renderHeader()}
          >
            <Column header="Name" style={{ minWidth: '10rem' }} body={nameTemplate} />
            <Column field="line_id" header="Sewing Line" style={{ minWidth: '12rem' }} />
            <Column field="line_id" header="Processes" style={{ minWidth: '12rem' }} />
            <Column header="Create" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} />
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
        </PageCard>
      </div>
    </div>
  );
};

export default OperatorsPage;
