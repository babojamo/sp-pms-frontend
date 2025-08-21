import { useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import FormInputText from '@/app/components/form/input-text/component';
import { Button } from 'primereact/button';
import { StyleItem } from '@/app/types/styles';
import { generateSimpleId } from '@/app/utils';
import FormInputNumber from '../form/input-number/component';

interface FormStyleItemTableProps {
  onItemsChanged?: (items: StyleItem[]) => void;
}

const FormStyleItemTable = ({ onItemsChanged }: FormStyleItemTableProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [styleItems, setStyleItem] = useState<StyleItem[]>([{ id: '1' }]);
  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({ '1': true });

  useEffect(() => {
    if (onItemsChanged) onItemsChanged(styleItems);
  }, [onItemsChanged, styleItems]);

  const onProcessDeleteClick = (data: StyleItem) => {
    setStyleItem(styleItems.filter((r) => r.id != data.id));
  };

  const onAddOperatorClick = () => {
    addNewItem();
  };

  const addNewItem = () => {
    const id = generateSimpleId() + styleItems.length;
    setEditingRows({
      ...editingRows,
      [id]: true
    });
    setStyleItem([...styleItems, { id }]);
  };

  const actionBodyTemplate = (rowData: StyleItem) => {
    return (
      <div className="flex gap-2">
        <Button size="small" onClick={() => onProcessDeleteClick(rowData)} icon="pi pi-trash" rounded severity="danger" />
      </div>
    );
  };

  const tableHeader = () => {
    return (
      <div className="flex flex-align-items-center">
        <div className="ml-auto flex align-items-center gap-2">
          <Button severity="help" type="button" onClick={onAddOperatorClick} className="mt-2" icon="pi pi-plus" label="Add" />
        </div>
      </div>
    );
  };

  return (
    <DataTable
      rows={10}
      editMode="row"
      editingRows={editingRows}
      onRowEditChange={(e: any) => setEditingRows(e.value)}
      header={tableHeader()}
      value={styleItems}
      loading={loading}
      paginator
      className="p-datatable-gridlines"
      showGridlines
      dataKey="id"
      filterDisplay="menu"
      emptyMessage="No items provided."
    >
      <Column field="item_name" header="Item" editor={(opts) => <FormInputText placeholder="e.g., Fabric, Lining Cloth" />} />
      <Column field="item_number" header="Item No." editor={(opts) => <FormInputText />} />
      <Column field="specs_qty" header="Specs" editor={(opts) => <FormInputNumber placeholder="Qty" />} />
      <Column field="youjyaku_qty" header="Youjyaku" editor={(opts) => <FormInputNumber placeholder="Qty" />} />
      <Column field="color_detail" header="Color Details" editor={(opts) => <FormInputText />} />
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
};

export default FormStyleItemTable;
