'use client';

import { useState } from 'react';
import '@xyflow/react/dist/style.css';
import { DataTable } from 'primereact/datatable';
import { OperatorProcess } from '@/app/types/operator';
import { Column } from 'primereact/column';
import FormDropdown from '@/app/components/form/dropdown/component';
import { SelectItem } from 'primereact/selectitem';
import FormInputText from '@/app/components/form/input-text/component';
import FormCalendar from '@/app/components/form/calendar/component';
import { Button } from 'primereact/button';
import moment from 'moment';
import { Calendar } from 'primereact/calendar';

interface SewingLineOperationPageState {
  currentDate?: Date;
}

const SewingLineOperationPage = () => {
  const [state, setState] = useState<SewingLineOperationPageState>({
    currentDate: new Date()
  });

  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
    '3': true,
    '4': true
  });

  const [operatorsProcess, setOperatorsProcess] = useState<OperatorProcess[]>([
    {
      process_id: '1',
      operator_id: '1',
      operator: {
        id: '1',
        name: 'Operator 1'
      }
    },
    {
      process_id: '1',
      operator_id: '2',
      operator: {
        id: '1',
        name: 'Operator 2'
      }
    },
    {
      process_id: '1',
      operator_id: '3',
      operator: {
        id: '1',
        name: 'Operator 3'
      }
    },
    {
      process_id: '1',
      operator_id: '4',
      operator: {
        id: '1',
        name: 'Operator 4'
      }
    }
  ]);

  const [processOptions, setProcessOptions] = useState<SelectItem[]>([
    { label: 'Process 1', value: '1' },
    { label: 'Process 2', value: '2' }
  ]);

  const actionBodyTemplate = (rowData: OperatorProcess) => {
    return (
      <div className="flex gap-2">
        <Button size="small" icon="pi pi-eye" label="Show Ouputs" rounded severity="warning" />
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-align-items-center">
        <div className="flex align-items-center gap-2 ml-auto">
          <div className="mt-2">
            <Button severity="help" icon="pi pi-arrow-left" style={{ marginRight: '.5em' }} />
          </div>
          <FormCalendar value={state.currentDate} label="Operation Date" />
          <div className="mt-2">
            <Button severity="help" icon="pi pi-arrow-right" style={{ marginRight: '.5em' }} />
          </div>
        </div>
      </div>
      <DataTable
        rows={10}
        editMode="row"
        editingRows={editingRows}
        onRowEditChange={(e: any) => setEditingRows(e.value)}
        header="Daily Output Process"
        value={operatorsProcess}
        paginator
        className="p-datatable-gridlines"
        showGridlines
        dataKey="operator_id"
        filterDisplay="menu"
        emptyMessage="No styles provided."
      >
        <Column field="operator.name" header="Operator" />
        <Column field="process_id" header="Process" editor={(opts) => <FormDropdown className="" options={processOptions} />} />
        <Column field="target" header="Target" editor={(opts) => <FormInputText className="" />} />
        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
      </DataTable>
    </div>
  );
};

export default SewingLineOperationPage;
