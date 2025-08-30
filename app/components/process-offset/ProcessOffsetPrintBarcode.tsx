import { Button } from 'primereact/button';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { ProcessOffset } from '@/app/types/process-offset';
import { SelectItem } from 'primereact/selectitem';
import FormDropdown from '../form/dropdown/component';
import Modal from '@/app/components/modal/component';
import React, { useContext, useEffect, useState } from 'react';
import useBarcodePrinting from '@/app/hooks/useBarcodePrinting';

interface SinglePrintBarcodeState {
  show?: boolean;
  saving?: boolean;
}

interface SinglePrintBarcodeProps {
  offset?: ProcessOffset;
  visible?: boolean;
  onHide?: any;
}

const ProcessOffsetPrintBarcode = ({ offset, visible, onHide }: SinglePrintBarcodeProps) => {
  const [state, setState] = useState<SinglePrintBarcodeState>({});
  const [selectedPrinter, setSelectedPrinter] = useState<string | null>();
  const [printerOptions, setPrinterOptions] = useState<SelectItem[]>([]);
  const { showError } = useContext(LayoutContext);
  const { queuePrintStyleBundle, fetchPrintersSelectOptions } = useBarcodePrinting();

  useEffect(() => {
    setState({ ...state, show: visible });
    if (visible) initData();
  }, [visible]);

  const onHideModal = () => {
    setState({ ...state, show: false });
    if (onHide) onHide();
  };

  const initData = async () => {
    setPrinterOptions(await fetchPrintersSelectOptions());
  };

  const print = async () => {
    setState({ ...state, saving: true });
    if (!selectedPrinter) {
      showError('Please select a printer.');
      return;
    }
    // @NOTE: Change to offset printing
    await queuePrintStyleBundle(selectedPrinter?.toString() ?? '', ['1']);
    setState({ ...state, saving: false });
  };

  return (
    <Modal title="Print Process Offset Barcode" width="50vh" visible={state.show} onHide={onHideModal} confirmSeverity="danger" hideActions={true}>
      <FormDropdown
        label="Barcode Printer"
        value={selectedPrinter}
        onChange={(option: any) => setSelectedPrinter(option.value)}
        placeholder="Select"
        options={printerOptions}
      />
      <div className="flex">
        <div className="ml-auto">
          <Button onClick={print} loading={state.saving} icon="pi pi-print" severity="info" label="Print Barcode" className="mr-2" />
        </div>
      </div>
    </Modal>
  );
};

export default ProcessOffsetPrintBarcode;
