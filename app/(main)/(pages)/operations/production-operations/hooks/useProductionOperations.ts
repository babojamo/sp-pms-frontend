import useUtilityData from '@/app/hooks/useUtilityData';
import { OperatorProcessService } from '@/app/services/OperatorProcessService';
import { OperatorProcess } from '@/app/types/operator';
import { generateSimpleId } from '@/app/utils';
import { SelectItem } from 'primereact/selectitem';
import { useState } from 'react';

export const useProductionOperations = () => {
  const [loadings, setLoadings] = useState<{
    fetchingSections: boolean,
    fetchingProcesses: boolean
  }>({
    fetchingProcesses: false,
    fetchingSections: false
  });

  const [selectedOperatorProcess, setSelectedOperatorProcess] = useState<OperatorProcess | undefined>();
  const [operatorsProcess, setOperatorsProcess] = useState<OperatorProcess[]>([]);
  const [operatorsOption, setOperatorsOption] = useState<SelectItem[]>([
    { label: 'Process 1', value: '1' },
    { label: 'Process 2', value: '2' }
  ]);
  const [processOptions, setProcessOptions] = useState<SelectItem[]>();
  const [sewingLineOptions, setSewingLineOptions] = useState<SelectItem[]>();

  const [shiftOptions, setShiftOptions] = useState<SelectItem[]>([
    { label: '08:00 - 18:00', value: '1' },
    { label: '19:00 - 23:00', value: '2' }
  ]);

  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
    '3': true,
    '4': true
  });

  const { fetchProcessOptions, fetchSectionSelectOption } = useUtilityData();


  const setLoading = (loading: any) => {
    setLoadings({
      ...loadings,
      ...loading
    })
  }
  const initData = () => {

    setLoading({ fetchingProcesses: true, fetchingSections: true });

    // Fetch processes
    fetchProcessOptions().then((data) => {
      setProcessOptions(data);
    }).finally(() => setLoading({ fetchingProcesses: false }))

    // Fetch sections
    fetchSectionSelectOption().then((data) => {
      setSewingLineOptions(data);
    }).finally(() => setLoading({ fetchingSections: false }))
  }

  const onAddOperatorClick = () => {
    const id = generateSimpleId();
    setEditingRows({
      ...editingRows,
      [id]: true
    });
    setOperatorsProcess([
      ...operatorsProcess,
      {
        id,
        process_id: '1',
        operator_id: '4',
        operator: {
          id: '1',
          name: 'Operator 4',
        }
      }
    ]);
  };

  const onProcessDeleteClick = (id: any) => {
    setOperatorsProcess(operatorsProcess.filter((e) => e.id != id));
  };


  const fetchProcess = async (process_id: any) => {
    return await OperatorProcessService.getProcess(process_id);
  };

  return {
    onAddOperatorClick,
    onProcessDeleteClick,
    setOperatorsProcess,
    setEditingRows,
    setSelectedOperatorProcess,
    operatorsOption,
    processOptions,
    sewingLineOptions,
    shiftOptions,
    operatorsProcess,
    editingRows,
    selectedOperatorProcess,
    loadings,
    fetchProcess,
    initData
  };
};
