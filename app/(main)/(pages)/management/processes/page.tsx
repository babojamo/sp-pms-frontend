'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { EMPTY_TABLE_MESSAGE } from '@/app/constants';
import { InputText } from 'primereact/inputtext';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { Process } from '@/app/types/process';
import { ProcessService } from '@/app/services/ProcessService';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/modal/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import PageCard from '@/app/components/page-card/component';
import PageHeader from '@/app/components/page-header/component';
import React, { useContext, useCallback, useEffect, useState } from 'react';
import TableHeader from '@/app/components/table-header/component';

interface ProcessPageState {
  deleteModalShow?: boolean;
  deleteId?: string | number;
}

interface SearchFilter {
  keyword?: string;
}

const ProcessesPage = () => {
  const [pageState, setPageState] = useState<ProcessPageState>({});
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SearchFilter>({});
  const { showApiError, showSuccess } = useContext(LayoutContext);

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
    return <TableHeader onClear={clearFilter1} />;
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

  const onActionDeleteClick = (id: string | number) => {
    setPageState({
      ...pageState,
      deleteModalShow: true,
      deleteId: id,
    });
  };

  const actionBodyTemplate = (rowData: Process) => {
    return (
      <>
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(rowData.id)} severity="warning" className="mr-2" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick(rowData.id)} severity="danger" />
      </>
    );
  };
  
  const handleDelete = async () => {
    try {
      await ProcessService.deleteProcess(pageState.deleteId as string);
      showSuccess('Section offset successfully created.');
      setPageState({ ...pageState, deleteModalShow: false });
      fetchProcesses();
    } catch (error: any) {
      showApiError(error, 'Failed to process offset.');
    }
  };

  return (
    <>
      <PageHeader titles={['Management', 'Processes']}>
        <PageAction actionAdd={() => router.push(ROUTES.PROCESS.CREATE)} actions={[PageActions.ADD]} />
      </PageHeader>

      <DataTable
        value={processes}
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
        <Column field="id" header="ID" />
        <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
        <Column field="created_by" header="Added By" style={{ minWidth: '12rem' }} />
        <Column body={actionBodyTemplate} header="Actions"></Column>
      </DataTable>
      <Modal
        title="Delete Record"
        visible={pageState.deleteModalShow}
        onHide={() => setPageState({ ...pageState, deleteModalShow: false })}
        confirmSeverity="danger"
        onConfirm={() => handleDelete()}
      >
        <p>Are you sure you want to delete the record?</p>
      </Modal>
    </>
  );
};

export default ProcessesPage;
