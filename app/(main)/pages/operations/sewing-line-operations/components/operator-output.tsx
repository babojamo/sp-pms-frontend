'use client';
import React, { useEffect, useState } from 'react';
import Modal from '@/app/components/modal/component';
import { OperatorProcess } from '@/app/types/operator';
import { useSewingLineOperations } from '../hooks/useSewingLineOperations';
import ProcessOutputTable from '@/app/components/processes/ProcessOutputTable';

interface OperatorOutputPageState {
  show?: boolean;
}

interface OperatorOutputProps {
  visible?: boolean;
  onHide?: any;
  operator_proceess_id?: string | number;
}

interface OperatorOutput {
  id?: string;
  operator_name?: string;
  [time: string]: number | string | undefined;
}

interface ColDef {
  field: string;
  header: string;
  sortable?: boolean;
  filter?: boolean;
}

const OperatorOutput = ({ operator_proceess_id, visible, onHide }: OperatorOutputProps) => {
  const [state, setState] = useState<OperatorOutputPageState>({});
  const [processOutputs, setProcessOutputs] = useState<OperatorProcess[]>([]);

  const { fetchProcess } = useSewingLineOperations();

  useEffect(() => {
    if (operator_proceess_id) getProcess();
  }, [operator_proceess_id]);

  useEffect(() => {
    setState({ ...state, show: visible });
  }, [visible]);

  const getProcess = async () => {
    const processOutput = await fetchProcess(operator_proceess_id);
    setProcessOutputs([
      {
        ...processOutput
      }
    ]);
  };

  const onHideModal = () => {
    setState({ ...state, show: false });
    if (onHide) onHide();
  };

  return (
    <Modal title="Individual Output" visible={state.show} onHide={onHideModal} confirmSeverity="danger" width="90%" hideActions={true}>
      <ProcessOutputTable processOutputs={processOutputs} />
    </Modal>
  );
};

export default OperatorOutput;
