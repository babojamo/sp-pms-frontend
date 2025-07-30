'use client';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import Modal from '@/app/components/modal/component';
import Barcode from '@/app/components/barcode/Barcode';
import { Style } from '@/app/types/styles';

interface SinglePrintBarcodeState {
  show?: boolean;
}

interface SinglePrintBarcodeProps {
  style?: Style;
  visible?: boolean;
  onHide?: any;
}

const SinglePrintBarcode = ({ style, visible, onHide }: SinglePrintBarcodeProps) => {
  const [state, setState] = useState<SinglePrintBarcodeState>({});

  useEffect(() => {
    console.log('visislbe', visible);
    setState({ ...state, show: visible });
  }, [visible]);

  const onHideModal = () => {
    setState({ ...state, show: false });
    if (onHide) onHide();
  };

  return (
    <Modal title="Print Barcode" visible={state.show} onHide={onHideModal} confirmSeverity="danger" hideActions={true}>
      <div className="flex">
        <div className="m-auto">
          <Barcode value={style?.style_number ?? 'NO STYLE'} />
          <p>Style#: </p>
        </div>
      </div>
      <div className="flex">
        <div className="ml-auto">
          <Button onClick={() => {}} icon="pi pi-print" severity="info" label="Print Barcode" className="mr-2" />
        </div>
      </div>
    </Modal>
  );
};

export default SinglePrintBarcode;
