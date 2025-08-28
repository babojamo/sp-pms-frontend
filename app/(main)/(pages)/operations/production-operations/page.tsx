'use client';

import '@xyflow/react/dist/style.css';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { OperatorProcess } from '@/app/types/operator';
import { useEffect, useState } from 'react';
import { useProductionOperations } from './hooks/useProductionOperations';
import FormCalendar from '@/app/components/form/calendar/component';
import FormDropdown from '@/app/components/form/dropdown/component';
import FormInputText from '@/app/components/form/input-text/component';
import FormMultiDropdown from '@/app/components/form/multi-dropdown/component';
import moment from 'moment';
import OperatorOutput from './components/operator-output';

interface ProductionOperationPageState {
  currentDate?: Date;
  showOperatorOutput?: boolean;
  selectedSection?: any;
}

const ProductionOperationPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<ProductionOperationPageState>({
    currentDate: new Date()
  });
 

  const {
    editingRows,
    onProcessDeleteClick,
    onAddOperatorClick,
    operatorsOption,
    sewingLineOptions,
    processOptions,
    setEditingRows,
    setSelectedOperatorProcess,
    selectedOperatorProcess,
    loadings,
    initData
  } = useProductionOperations();

  useEffect(() => {
    initData();
  }, []);



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
        <Button size="small" icon="pi pi-eye" onClick={() => onShowOutput(rowData)} label="Show Ouputs" severity="warning" />
        <Button size="small" onClick={() => onProcessDeleteClick(rowData.id)} icon="pi pi-trash" severity="danger" />
      </div>
    );
  };


  const tableHeader = () => {
    return (
      <div className="flex flex-align-items-center">
        <div className="flex align-items-center gap-2">
          <FormDropdown loading={loadings.fetchingSections} label="Section" value={state.selectedSection} onChange={(option) => setState({...state, selectedSection: option.value})} filter={true} placeholder="Select" options={sewingLineOptions} />
          <FormMultiDropdown loading={loadings.fetchingProcesses} label="Process" filter={true} placeholder="Select" options={processOptions} />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-align-items-center">
        <p className="m-0 text-lg line-height-3 flex-1">
          Production Process for <strong>{moment(state.currentDate).format('Y MMMM D')}</strong>
        </p>

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
      <DataTable
        rows={10}
        editMode="row"
        editingRows={editingRows}
        onRowEditChange={(e: any) => setEditingRows(e.value)}
        header={tableHeader()}
        value={[]}
        loading={loading}
        paginator
        className="p-datatable-gridlines"
        showGridlines
        dataKey="id"
        filterDisplay="menu"
        emptyMessage="No styles provided."
      >
        <Column
          field="operator_id"
          header="Operator"
          editor={(opts) => <FormMultiDropdown filter={true} className="" placeholder="Select" options={operatorsOption} />}
        />
        <Column field="operator.line.name" header="Line#" />
        <Column field="process_id" header="Process" editor={(opts) => <FormDropdown className="" placeholder="Select" options={processOptions} />} />
        <Column field="target" header="Target" editor={(opts) => <FormInputText className="" placeholder="Quantity" />} />
        <Column field="target" header="Remark" editor={(opts) => <FormInputText className="" placeholder="Remarks" />} />
        <Column field="total_output" header="Total Ouput" />
        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
      </DataTable>
      <OperatorOutput
        operator_proceess_id={selectedOperatorProcess?.id}
        visible={state.showOperatorOutput}
        onHide={() => setState({ ...state, showOperatorOutput: false })}
      />
    </>
  );
};

export default ProductionOperationPage;
