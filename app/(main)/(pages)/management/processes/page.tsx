'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Process } from '@/app/types/process';
import { ProcessService } from '@/app/services/ProcessService';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/modal/component';
import PageCard from '@/app/components/page-card/component';
import React, { useCallback, useEffect, useState } from 'react';

interface ProcessPageState {
  deleteModalShow?: boolean;
}

interface SearchFilter {
  keyword?: string;
}

const ProcessesPage = () => {
  const [pageState, setPageState] = useState<ProcessPageState>({});
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SearchFilter>({});

  const router = useRouter();

  const clearFilter1 = () => {
    setFilter({
      keyword: ''
    });
    fetchProcesses();
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      keyword: value
    });
    fetchProcesses();
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

  const fetchProcesses = useCallback(async () => {
    setLoading(true);
    const data = await ProcessService.getProcesses();
    setProcesses(getProcesses(data.data.data ?? []));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProcesses();
  }, [fetchProcesses]);

  const getProcesses = (data: Process[]) => {
    return [...(data || [])].map((d) => {
      return d;
    });
  };

  const toolbars = () => {
    return (
      <>
        <Button label="New" onClick={() => router.push(ROUTES.PROCESS.CREATE)} icon="pi pi-plus" style={{ marginRight: '.5em' }} />
      </>
    );
  };

  const onActionEditClick = (id: string | number) => {
    router.push(`${ROUTES.PROCESS.EDIT}/${id}`);
  };

  const onActionDeleteClick = () => {
    setPageState({
      ...pageState,
      deleteModalShow: true
    });
  };

  const actionBodyTemplate = (rowData: Process) => {
    return (
      <>
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(rowData.id)} rounded severity="warning" className="mr-2" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick()} rounded severity="danger" />
      </>
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <PageCard title="Processes Management" toolbar={toolbars()}>
          <DataTable
            value={processes}
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
            <Column field="id" header="ID" />
            <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
            <Column field="created_by" header="Added By" style={{ minWidth: '12rem' }} />
            <Column body={actionBodyTemplate}></Column>
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

export default ProcessesPage;
