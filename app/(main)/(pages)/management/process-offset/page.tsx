'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { EMPTY_TABLE_MESSAGE } from '@/app/constants';
import { ProcessOffset } from '@/app/types/process-offset';
import { ProcessOffsetService } from '@/app/services/ProcessOffsetService';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/modal/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import PageHeader from '@/app/components/page-header/component';
import React, { useCallback, useEffect, useState } from 'react';
import TableHeader from '@/app/components/table-header/component';

interface ProcessOffsetPageState {
  deleteModalShow?: boolean;
}

interface SearchFilter {
  keyword?: string;
}

const ProcessOffsetsPage = () => {
  const [pageState, setPageState] = useState<ProcessOffsetPageState>({});
  const [processOffsets, setProcessOffsets] = useState<ProcessOffset[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SearchFilter>({});
  const router = useRouter();

  const clearFilter1 = () => {
    setFilter({
      keyword: ''
    });
    fetchProcessOffsets();
  };

  const renderHeader = () => {
    return <TableHeader onClear={clearFilter1} />;
  };

  const fetchProcessOffsets = useCallback(async () => {
    setLoading(true);
    const { data } = await ProcessOffsetService.getProcessOffsets();
    setProcessOffsets(getProcessOffsets(data.data ?? []));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProcessOffsets();
  }, [fetchProcessOffsets]);

  const getProcessOffsets = (data: ProcessOffset[]) => {
    return [...(data || [])].map((d) => {
      return d;
    });
  };

  const toolbars = () => {
    return (
      <>
        <Button label="New" onClick={() => router.push(ROUTES.PROCESS_OFFSETS.CREATE)} icon="pi pi-plus" style={{ marginRight: '.5em' }} />
      </>
    );
  };

  const onActionDeleteClick = () => {
    setPageState({
      ...pageState,
      deleteModalShow: true
    });
  };

  const onActionEditClick = (id: string | number) => {
    router.push(`${ROUTES.PROCESS_OFFSETS.EDIT}/${id}`);
  };

  const actionBodyTemplate = (rowData: ProcessOffset) => {
    return (
      <>
        <Button icon="pi pi-print" title="Print Barcode" size="small" severity="success" className="mr-2" />
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(rowData.id)} size="small" severity="warning" className="mr-2" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick()} size="small" severity="danger" />
      </>
    );
  };

  return (
    <>
      <PageHeader titles={['Management', 'Operators']}>
        <PageAction actionAdd={() => router.push(ROUTES.OPERATORS.CREATE)} actions={[PageActions.ADD]} />
      </PageHeader>

      <DataTable
        value={processOffsets}
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
        <Column field="description" header="Description" style={{ minWidth: '12rem' }} />
        <Column field="created_by" header="Added By" style={{ minWidth: '12rem' }} />
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

export default ProcessOffsetsPage;
