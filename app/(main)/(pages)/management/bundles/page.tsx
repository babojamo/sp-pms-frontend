'use client';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import PageCard from '@/app/components/page-card/component';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/constants/routes';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import Modal from '@/app/components/modal/component';
import FormDropdown from '@/app/components/form/dropdown/component';
import BundleSinglePrintBarcode from '@/app/components/style/BundleSinglePrintBarcode';
import { BundleService } from '@/app/services/BundleService';
import { Bundle } from '@/app/types/bundles';
import ReleaseBundles from './components/release-bundle';

interface BundlePageState {
  deleteModalShow?: boolean;
  showSinglePrintBarcode?: boolean;
  showRelease?: boolean;

  showMultiPrintBarcode?: boolean;
  showUploading?: boolean;
}

const BundlesPage = () => {
  const [pageState, setPageState] = useState<BundlePageState>({});
  const [selectedBundle, setSelectedBundle] = useState<Bundle | undefined>(undefined);

  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [selectedBundles, setSelectedBundles] = useState<Bundle[]>([]);

  const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
  const [loading1, setLoading1] = useState(true);
  const [globalFilterValue1, setGlobalFilterValue1] = useState('');
  const router = useRouter();

  const clearFilter1 = () => {
    initFilters1();
  };

  const onGlobalFilterChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    (_filters1['global'] as any).value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-start items-center">
        <div>
          <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter1} />
        </div>
        <div className="flex gap-2 ml-auto">
          <FormDropdown placeholder="Filter Buyer" />
          <div>
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
            </span>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    BundleService.getBundles().then((data) => {
      setBundles(getBundles(data));
      setLoading1(false);
    });
    initFilters1();
  }, []);

  const getBundles = (data: Bundle[]) => {
    return [...(data || [])].map((d) => {
      return d;
    });
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      'country.name': {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
      },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    setGlobalFilterValue1('');
  };

  const onActionEditClick = (id: string | number) => {
    router.push(`${ROUTES.BUNDLES.EDIT}/${id}`);
  };

  const onActionDeleteClick = () => {
    setPageState({
      ...pageState,
      deleteModalShow: true
    });
  };

  const onSinglePrintBarcodeClick = (data: Bundle) => {
    setSelectedBundle(data);
    setPageState({
      ...pageState,
      showSinglePrintBarcode: true
    });
  };

  const actionBodyTemplate = (rowData: Bundle) => {
    return (
      <div className="flex flex-row gap-2">
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(1)} size="small" severity="warning" />
        <Button icon="pi pi-print" onClick={() => onSinglePrintBarcodeClick(rowData)} size="small" severity="help" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick()} size="small" severity="danger" />
      </div>
    );
  };

  const onBundleSelectionChange = (data: any) => {
    setSelectedBundles(data.value);
  };

  const header1 = renderHeader1();

  return (
    <div className="grid">
      <div className="col-12">
        <PageCard
          title="Production Bundle Management"
          toolbar={
            <PageAction>
              <Button
                onClick={() => setPageState({ ...pageState, showRelease: true })}
                label="Release Bundle"
                icon="pi pi-arrow-up-right"
                style={{ marginRight: '.5em' }}
              />
              <Button
                onClick={() => setPageState({ ...pageState, showMultiPrintBarcode: true })}
                severity="help"
                label="Print Barcodes"
                icon="pi pi-print"
                style={{ marginRight: '.5em' }}
              />
            </PageAction>
          }
        >
          <DataTable
            value={bundles}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="id"
            filters={filters1}
            filterDisplay="menu"
            loading={loading1}
            emptyMessage="No customers found."
            selectionMode={'checkbox'}
            selection={selectedBundles}
            onSelectionChange={onBundleSelectionChange}
            header={header1}
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
            <Column field="control_number" header="Style#" style={{ minWidth: '12rem' }} />
            <Column field="control_number" header="Control#" style={{ minWidth: '12rem' }} />
            <Column field="bundle_number" header="Bundle#" style={{ minWidth: '12rem' }} />
            <Column field="buyer_name" header="Quantity" style={{ minWidth: '12rem' }} />
            <Column field="pleats_name" header="Size" style={{ minWidth: '12rem' }} />
            <Column field="pleats_name" header="Meter" style={{ minWidth: '12rem' }} />
            <Column header="Color" field="ship_date_from_japan" />
            <Column field="ship_date_from_cebu" header="Cebu Date" />
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
          <BundleSinglePrintBarcode
            bundle={selectedBundle}
            onHide={() => setPageState({ ...pageState, showSinglePrintBarcode: false })}
            visible={pageState.showSinglePrintBarcode}
          />
          <ReleaseBundles onHide={() => setPageState({ ...pageState, showRelease: false })} visible={pageState.showRelease} />
        </PageCard>
      </div>
    </div>
  );
};

export default BundlesPage;
