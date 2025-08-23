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
import { Section } from '@/app/types/section';
import { SectionService } from '@/app/services/SectionService';

interface SectionPageState {
  deleteModalShow?: boolean;
}

interface SearchFilter {
  keyword?: string;
}

const SectionsPage = () => {
  const [pageState, setPageState] = useState<SectionPageState>({});
  const [Sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SearchFilter>({});

  const router = useRouter();

  const clearFilter1 = () => {
    setFilter({
      keyword: ''
    });
    fetchSections();
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      keyword: value
    });
    fetchSections();
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

  const fetchSections = useCallback(async () => {
    setLoading(true);
    const data = await SectionService.getSections();
    setSections(getSections(data.data.data ?? []));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const getSections = (data: Section[]) => {
    return [...(data || [])].map((d) => {
      return d;
    });
  };

  const toolbars = () => {
    return (
      <>
        <Button label="New" onClick={() => router.push(ROUTES.SECTION.CREATE)} icon="pi pi-plus" style={{ marginRight: '.5em' }} />
      </>
    );
  };

  const onActionEditClick = (id: string | number) => {
    router.push(`${ROUTES.SECTION.EDIT}/${id}`);
  };

  const onActionDeleteClick = () => {
    setPageState({
      ...pageState,
      deleteModalShow: true
    });
  };

  const actionBodyTemplate = (rowData: Section) => {
    return (
      <>
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(rowData.id ?? '')} rounded severity="warning" className="mr-2" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick()} rounded severity="danger" />
      </>
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <PageCard title="Sections Management" toolbar={toolbars()}>
          <DataTable
            value={Sections}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="id"
            filterDisplay="menu"
            loading={loading}
            emptyMessage="No customers found."
            header={renderHeader()}
          >
            <Column field="id" header="ID" style={{ minWidth: '12rem' }} />
            <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
            <Column field="department.name" header="Department" style={{ minWidth: '12rem' }} />
            <Column field="created_at" header="Created" style={{ minWidth: '12rem' }} />
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

export default SectionsPage;
