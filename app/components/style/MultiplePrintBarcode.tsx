'use client';
import { Button } from 'primereact/button';
import React, { useEffect, useRef, useState } from 'react';
import Modal from '@/app/components/modal/component';
import Barcode from '@/app/components/barcode/Barcode';
import { Style } from '@/app/types/styles';
import { ListBox } from 'primereact/listbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface MultiplePrintBarcodeState {
  show?: boolean;
  styles?: Style[];
}

interface MultiplePrintBarcodeProps {
  visible?: boolean;
  onHide?: any;
  styles: Style[];
}

interface StyleDetail {
  name: string;
  value: string;
}

const MultiplePrintBarcode = ({ styles, visible, onHide }: MultiplePrintBarcodeProps) => {
  const [state, setState] = useState<MultiplePrintBarcodeState>({});

  useEffect(() => {
    setState({ ...state, show: visible });
  }, [visible]);

  useEffect(() => {
    setState({ ...state, styles });
  }, [styles]);

  const onHideModal = () => {
    setState({ ...state, show: false });
    if (onHide) onHide();
  };

  return (
    <Modal title="Print Barcode" visible={state.show} onHide={onHideModal} confirmSeverity="danger" hideActions={true}>
      <DataTable
        rows={10}
        value={state.styles}
        paginator
        className="p-datatable-gridlines"
        showGridlines
        dataKey="id"
        filterDisplay="menu"
        emptyMessage="No styles provided."
      >
        <Column field="control_number" header="Control#" style={{ minWidth: '12rem' }} />
        <Column field="style_number" header="Style#" style={{ minWidth: '12rem' }} />
        <Column field="buyer_name" header="Buyer" style={{ minWidth: '12rem' }} />
      </DataTable>
      <div className="flex">
        <div className="ml-auto">
          <Button onClick={() => {}} icon="pi pi-print" severity="info" label="Print Barcode" className="mr-2" />
        </div>
      </div>
    </Modal>
  );
};

export default MultiplePrintBarcode;
