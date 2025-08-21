'use client';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import Modal from '@/app/components/modal/component';
import { DataTable } from 'primereact/datatable';
import { useSewingLineOperations } from '../hooks/useSewingLineOperations';
import FormMultiDropdown from '@/app/components/form/multi-dropdown/component';
import { Column } from 'primereact/column';
import FormDropdown from '@/app/components/form/dropdown/component';
import FormInputText from '@/app/components/form/input-text/component';
import { OperatorProcess } from '@/app/types/operator';

interface SinglePrintBarcodeState {
  show?: boolean;
}

interface SinglePrintBarcodeProps {
  visible?: boolean;
  onHide?: any;
}

interface BundleDetail {
  name: string;
  value: string;
}

const ReleaseBundles = ({ visible, onHide }: SinglePrintBarcodeProps) => {
  const [state, setState] = useState<SinglePrintBarcodeState>({});

  const [loading, setLoading] = useState<boolean>(false);

  const {
    operatorsProcess,
    editingRows,
    onProcessDeleteClick,
    onAddOperatorClick,
    operatorsOption,
    sewingLineOptions,
    processOptions,
    shiftOptions,
    setEditingRows,
    fetchProcesses,
    setSelectedOperatorProcess,
    selectedOperatorProcess
  } = useSewingLineOperations();

  useEffect(() => {
    if (fetchProcesses) {
      fetchProcesses();
    }
  }, []);

  useEffect(() => {
    setState({ ...state, show: visible });
  }, [visible]);

  const onHideModal = () => {
    setState({ ...state, show: false });
    if (onHide) onHide();
  };

  const tableHeader = () => {
    return (
      <div className="flex flex-align-items-center">
        <div className="flex align-items-center gap-2">
          <FormMultiDropdown label="Style" filter={true} placeholder="Select" options={sewingLineOptions} />
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData: OperatorProcess) => {
    return (
      <div className="flex gap-2">
        <Button size="small" icon="pi pi-copy" rounded title="Clone" severity="warning" />
        <Button size="small" onClick={() => onProcessDeleteClick(rowData.id)} icon="pi pi-trash" rounded severity="danger" />
      </div>
    );
  };

  const numberBodyTemplate = (rowData: OperatorProcess) => {
    return (
      <>
        <i className="pi pi-lock text-sm" title="Locked"></i>
        <span>{rowData.id}</span>
      </>
    );
  };
  return (
    <Modal title="Release Bundles" visible={state.show} onHide={onHideModal} confirmSeverity="danger" hideActions={true}>
      <DataTable
        rows={10}
        editMode="row"
        editingRows={editingRows}
        onRowEditChange={(e: any) => setEditingRows(e.value)}
        header={tableHeader()}
        value={operatorsProcess}
        loading={loading}
        paginator
        className="p-datatable-gridlines"
        showGridlines
        dataKey="id"
        filterDisplay="menu"
        emptyMessage="No styles provided."
      >
        <Column body={numberBodyTemplate} field="operator.line.name" header="#" />
        <Column
          field="operator_id"
          header="Color"
          editor={(opts) => <FormMultiDropdown filter={true} className="" placeholder="Select" options={operatorsOption} />}
        />
        <Column
          field="operator_id"
          header="Meter"
          editor={(opts) => <FormMultiDropdown filter={true} className="" placeholder="Select" options={operatorsOption} />}
        />
        <Column
          field="operator_id"
          header="Size"
          editor={(opts) => <FormMultiDropdown filter={true} className="" placeholder="Select" options={operatorsOption} />}
        />
        <Column field="target" header="Quantity" editor={(opts) => <FormInputText className="" placeholder="Quantity" />} />
        <Column field="target" header="Remark" editor={(opts) => <FormInputText className="" placeholder="Remarks" />} />
        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
      </DataTable>

      <p className="mt-2">Locked bundles could not be edited</p>
      <div className="flex">
        <div className="ml-auto">
          <Button onClick={() => {}} icon="pi pi-arrow-up-right" severity="info" label="Release" className="mr-2" />
        </div>
      </div>
    </Modal>
  );
};

export default ReleaseBundles;
