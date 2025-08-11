'use client';
import { CustomerService } from '../../../../../demo/service/CustomerService';
import { ProductService } from '../../../../../demo/service/ProductService';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column, ColumnFilterApplyTemplateOptions, ColumnFilterClearTemplateOptions, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { DataTable, DataTableExpandedRows, DataTableFilterMeta } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import type { Demo } from '@/types';
import PageCard from '@/app/components/page-card/component';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/constants/routes';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import Modal from '@/app/components/modal/component';
import FormDropdown from '@/app/components/form/dropdown/component';
import SinglePrintBarcode from '@/app/components/style/SinglePrintBarcode';
import { Style } from '@/app/types/styles';
import { StyleService } from '@/app/services/StyleService';
import UploadStyles from './components/upload-styles';
import MultiplePrintBarcode from '@/app/components/style/MultiplePrintBarcode';

interface StylePageState {
  deleteModalShow?: boolean;
  showSinglePrintBarcode?: boolean;
  showMultiPrintBarcode?: boolean;
  showUploading?: boolean;
}

const StylesPage = () => {

  const [pageState, setPageState] = useState<StylePageState>({});
  const [selectedStyle, setSelectedStyle] = useState<Style | undefined>(undefined);

  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<Style[]>([]);

  const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [globalFilterValue1, setGlobalFilterValue1] = useState('');
  const router = useRouter();

  const statuses = ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'];

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
        <div className='flex gap-2 ml-auto'>
          <FormDropdown placeholder='Filter Buyer' />
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
    setLoading2(true);
    StyleService.getStyles().then((data) => {
      setStyles(getStyles(data));
      setLoading1(false);
    });
    initFilters1();
  }, []);


  const getStyles = (data: Style[]) => {
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

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
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
    router.push(`${ROUTES.STYLES_EDIT}/${id}`);
  }


  const onActionDeleteClick = () => {
    setPageState({
      ...pageState,
      deleteModalShow: true
    })
  }

  const onSinglePrintBarcodeClick = (data: Style) => {
    setSelectedStyle(data);
    setPageState({
      ...pageState,
      showSinglePrintBarcode: true
    })
  }

  const actionBodyTemplate = (rowData: Style) => {
    return (
      <div className='flex flex-row gap-2'>
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(1)} size='small'  title='Release Bundle'/>
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(1)} size='small' severity="warning" />
        <Button icon="pi pi-print" onClick={() => onSinglePrintBarcodeClick(rowData)} size='small' severity="help" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick()} size='small' severity="danger" />
      </div>
    );
  };

  const onStyleSelectionChange = (data: any) => {
    setSelectedStyles(data.value)
  }

  const header1 = renderHeader1();

  return (
    <div className="grid">
      <div className="col-12">
        <PageCard title='Production Style Management'
          toolbar={
            <PageAction
              actionAdd={() => router.push(ROUTES.STYLES_CREATE)}
              actionUpload={() => setPageState({ ...pageState, showUploading: true })}
              actions={[
                PageActions.ADD,
                PageActions.UPLAOD
              ]}

            >
              <Button onClick={() => setPageState({ ...pageState, showMultiPrintBarcode: true })} severity='help' label="Print Barcodes" icon="pi pi-print" style={{ marginRight: '.5em' }} />
            </PageAction>
          }
        >
          <DataTable
            value={styles}
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
            selection={selectedStyles}
            onSelectionChange={onStyleSelectionChange}
            header={header1}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: '3em' }}
            />
            <Column field="control_number" header="Control#" style={{ minWidth: '12rem' }} />
            <Column field="style_number" header="Style#" style={{ minWidth: '12rem' }} />
            <Column field="buyer_name" header="Buyer" style={{ minWidth: '12rem' }} />
            <Column field="pleats_name" header="Pleats" style={{ minWidth: '12rem' }} />
            <Column field="pleats_name" header="Pleats" style={{ minWidth: '12rem' }} />
            <Column header="Japan Date" field="ship_date_from_japan" />
            <Column field="ship_date_from_cebu" header="Cebu Date" />
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
          </DataTable>
          <Modal
            title='Delete Record'
            visible={pageState.deleteModalShow}
            onHide={() => setPageState({ ...pageState, deleteModalShow: false })}
            confirmSeverity='danger'
          >
            <p>Are you sure you want to delete the record?</p>
          </Modal>
          <SinglePrintBarcode style={selectedStyle} onHide={() => setPageState({ ...pageState, showSinglePrintBarcode: false })} visible={pageState.showSinglePrintBarcode} />
          <UploadStyles onHide={() => setPageState({ ...pageState, showUploading: false })} visible={pageState.showUploading} />
          <MultiplePrintBarcode styles={selectedStyles} onHide={() => setPageState({ ...pageState, showMultiPrintBarcode: false })} visible={pageState.showMultiPrintBarcode} />
        </PageCard>
      </div>
    </div>
  );
};

export default StylesPage;
