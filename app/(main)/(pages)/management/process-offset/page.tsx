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
import { ProcessOffset } from '@/app/types/process-offset';
import { ProcessOffsetService } from '@/app/services/ProcessOffsetService';

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

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      keyword: value
    });
    fetchProcessOffsets();
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
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(rowData.id)} rounded severity="warning" className="mr-2" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick()} rounded severity="danger" />
      </>
    );
  };

  const attachedToBodyTemplate = (row: ProcessOffset) => {
    return (
      <div className="flex flex-column">
        {row.operators?.map((operator: Operator) => (
          <>
            <a href="#">{operator.name}</a>
          </>
        ))}
      </div>
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <PageCard title="Process Offset" toolbar={toolbars()}>
          <DataTable
            value={processOffsets}
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
            <Column field="id" header="ID" style={{ minWidth: '12rem' }} />
            <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
            <Column field="description" header="Description" style={{ minWidth: '12rem' }} />
            <Column field="created_by" header="Added By" style={{ minWidth: '12rem' }} />
            <Column body={actionBodyTemplate} headerStyle={{ width: 'auto' }}></Column>
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

export default ProcessOffsetsPage;
