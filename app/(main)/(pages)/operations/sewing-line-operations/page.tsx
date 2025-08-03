'use client';

import { useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';
import { DataTable } from 'primereact/datatable';
import { OperatorProcess } from '@/app/types/operator';
import { Column } from 'primereact/column';
import FormDropdown from '@/app/components/form/dropdown/component';
import FormInputText from '@/app/components/form/input-text/component';
import FormCalendar from '@/app/components/form/calendar/component';
import { Button } from 'primereact/button';
import PageCard from '@/app/components/page-card/component';
import moment from 'moment';
import FormMultiDropdown from '@/app/components/form/multi-dropdown/component';
import { useSewingLineOperations } from './hooks/useSewingLineOperations';
import OperatorOutput from './components/operator-output';

interface SewingLineOperationPageState {
  currentDate?: Date;
  showOperatorOutput?: boolean;
}

const SewingLineOperationPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<SewingLineOperationPageState>({
    currentDate: new Date()
  });

  const { operatorsProcess, editingRows, onProcessDeleteClick, onAddOperatorClick, operatorsOption, sewingLineOptions, processOptions, shiftOptions, setEditingRows, fetchProcesses, setSelectedOperatorProcess, selectedOperatorProcess } =
    useSewingLineOperations();

  useEffect(() => {
    if (fetchProcesses) {
      fetchProcesses();
    }
  }, []);

  const title = () => {
    return (
      <>
        Operators Process for <strong>{moment(state.currentDate).format('Y MMMM D')}</strong>
      </>
    );
  };

  const onShowOutput = (rowData: OperatorProcess) => {
    setSelectedOperatorProcess(rowData);
    setState({ ...state, showOperatorOutput: true });
  };

  const onNextDateClick = () => {
    setState({
      ...state,
      currentDate: moment(state.currentDate).add(1, 'day').toDate()
    });
  };

  const onPrevDateClick = () => {
    setState({
      ...state,
      currentDate: moment(state.currentDate).subtract(1, 'day').toDate()
    });
  };

  const actionBodyTemplate = (rowData: OperatorProcess) => {
    return (
      <div className="flex gap-2">
        <Button size="small" icon="pi pi-eye" onClick={() => onShowOutput(rowData)} label="Show Ouputs" rounded severity="warning" />
        <Button size="small" onClick={() => onProcessDeleteClick(rowData.id)} icon="pi pi-trash" rounded severity="danger" />
      </div>
    );
  };

  const toolbar = () => {
    return (
      <div className="flex flex-align-items-center">
        <h3></h3>
        <div className="flex align-items-center gap-2 ml-auto">
          <div className="mt-2">
            <Button severity="help" onClick={onPrevDateClick} icon="pi pi-arrow-left" />
          </div>
          <FormCalendar value={state.currentDate} onChange={(e: any) => setState({ ...state, currentDate: e.value })} label="Operation Date" />
          <div className="mt-2">
            <Button severity="help" onClick={onNextDateClick} icon="pi pi-arrow-right" />
          </div>
          <Button severity="help" onClick={onAddOperatorClick} className="mt-2" icon="pi pi-plus" label="Add Process" />
          <Button severity="success" onClick={onAddOperatorClick} className="mt-2" icon="pi pi-save" label="Save" />
        </div>
      </div>
    );
  };

  const tableHeader = () => {
    return (
      <div className="flex flex-align-items-center">
        <div className="flex align-items-center gap-2">
          <FormMultiDropdown label="Sewing Line" filter={true} placeholder="Select" options={sewingLineOptions} />
          <FormMultiDropdown label="Process" filter={true} placeholder="Select" options={processOptions} />
        </div>
      </div>
    );
  };

  return (
    <PageCard title={title()} toolbar={toolbar()}>
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
        <Column field="operator_id" header="Operator" editor={(opts) => <FormMultiDropdown filter={true} className="" placeholder="Select" options={operatorsOption} />} />
        <Column field="operator.line.name" header="Line#" />
        <Column field="process_id" header="Process" editor={(opts) => <FormDropdown className="" placeholder="Select" options={processOptions} />} />
        <Column field="target" header="Target" editor={(opts) => <FormInputText className="" placeholder="Quantity" />} />
        <Column field="process_id" header="Shift" editor={(opts) => <FormDropdown className="" placeholder="Select" options={shiftOptions} />} />
        <Column field="target" header="Remark" editor={(opts) => <FormInputText className="" placeholder="Remarks" />} />
        <Column field="total_output" header="Total Ouput" />
        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
      </DataTable>
      <OperatorOutput operator_proceess_id={selectedOperatorProcess?.id} visible={state.showOperatorOutput} onHide={() => setState({ ...state, showOperatorOutput: false })} />
    </PageCard>
  );
};

export default SewingLineOperationPage;
