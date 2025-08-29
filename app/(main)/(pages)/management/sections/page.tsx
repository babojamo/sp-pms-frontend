'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { ROUTES } from '@/app/constants/routes';
import { Section } from '@/app/types/section';
import { SectionService } from '@/app/services/SectionService';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/modal/component';
import PageCard from '@/app/components/page-card/component';
import React, { useContext, useCallback, useEffect, useState } from 'react';
import { LayoutContext } from '@/layout/context/layoutcontext';
import PageHeader from '@/app/components/page-header/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import TableHeader from '@/app/components/table-header/component';
import { EMPTY_TABLE_MESSAGE } from '@/app/constants';

interface SectionPageState {
  deleteModalShow?: boolean;
  deleteId?: string | number;
}

interface SearchFilter {
  keyword?: string;
}

const SectionsPage = () => {
  const [pageState, setPageState] = useState<SectionPageState>({});
  const [Sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SearchFilter>({});
  const { showApiError, showSuccess } = useContext(LayoutContext);

  const router = useRouter();

  const clearFilter1 = () => {
    setFilter({
      keyword: ''
    });
    fetchSections();
  };

  const renderHeader = () => {
    return <TableHeader onClear={clearFilter1} />;
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

  const onActionEditClick = (id: string | number) => {
    router.push(`${ROUTES.SECTION.EDIT}/${id}`);
  };

  const onActionDeleteClick = (id: string | number) => {
    setPageState({
      ...pageState,
      deleteModalShow: true,
      deleteId: id,
    });
  };

  const actionBodyTemplate = (rowData: Section) => {
    return (
      <>
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(rowData.id ?? '')} size="small" severity="warning" className="mr-2" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick(rowData.id ?? '')} size="small" severity="danger" />
      </>
    );
  };

  const handleDelete = async () => {
    try {
      await SectionService.deleteSection(pageState.deleteId as string);
      showSuccess('Section offset successfully created.');
      setPageState({ ...pageState, deleteModalShow: false });
      fetchSections();
    } catch (error: any) {
      showApiError(error, 'Failed to process offset.');
    }
  };

  return (
    <>
      <PageHeader titles={['Management', 'Sections']}>
        <PageAction actionAdd={() => router.push(ROUTES.SECTION.CREATE)} actions={[PageActions.ADD]} />
      </PageHeader>

      <DataTable
        value={Sections}
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
        <Column field="department.name" header="Department" style={{ minWidth: '12rem' }} />
        <Column field="created_at" header="Created" style={{ minWidth: '12rem' }} />
        <Column header="Actions" body={actionBodyTemplate}></Column>
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

export default SectionsPage;
