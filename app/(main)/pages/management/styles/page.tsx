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

interface StylePageState {
  deleteModalShow?: boolean;
  showSinglePrintBarcode?: boolean;
}

const StylesPage = () => {

  const [pageState, setPageState] = useState<StylePageState>({});
  const [selectedStyle, setSelectedStyle] = useState<Style | undefined>(undefined);

  const [styles, setStyles] = useState<Style[]>([]);

  const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [products, setProducts] = useState<Demo.Product[]>([]);
  const [globalFilterValue1, setGlobalFilterValue1] = useState('');
  const [expandedRows, setExpandedRows] = useState<any[] | DataTableExpandedRows>([]);
  const [allExpanded, setAllExpanded] = useState(false);
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


  const filterClearTemplate = (options: ColumnFilterClearTemplateOptions) => {
    return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></Button>;
  };

  const filterApplyTemplate = (options: ColumnFilterApplyTemplateOptions) => {
    return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} severity="success"></Button>;
  };

  const dateBodyTemplate = (rowData: Demo.Customer) => {
    return formatDate(rowData.date);
  };

  const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
  };

  const balanceBodyTemplate = (rowData: Demo.Customer) => {
    return formatCurrency(rowData.balance as number);
  };

  const balanceFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
  };

  const statusBodyTemplate = (rowData: Demo.Customer) => {
    return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
  };

  const statusFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
  };

  const statusItemTemplate = (option: any) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const toggleAll = () => {
    if (allExpanded) collapseAll();
    else expandAll();
  };

  const expandAll = () => {
    let _expandedRows = {} as { [key: string]: boolean };
    products.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
    setAllExpanded(true);
  };

  const collapseAll = () => {
    setExpandedRows([]);
    setAllExpanded(false);
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
      <div className='flex gap-2'>
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(1)} rounded severity="warning"/>
        <Button icon="pi pi-print" onClick={() => onSinglePrintBarcodeClick(rowData)} rounded severity="help"/>
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick()} rounded severity="danger" />
      </div>
    );
  };

  const header1 = renderHeader1();

  return (
    <div className="grid">
      <div className="col-12">
        <PageCard title='Production Style Management'
          toolbar={
            <PageAction
              actionAdd={() => router.push(ROUTES.STYLES_CREATE)}
              actions={[
                PageActions.ADD,
                PageActions.UPLAOD
              ]}
            >
              <Button onClick={() => { }} severity='help' label="Print Barcodes" icon="pi pi-print" style={{ marginRight: '.5em' }} />
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
            header={header1}
          >
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
        </PageCard>
      </div>
    </div>
  );
};

export default StylesPage;
