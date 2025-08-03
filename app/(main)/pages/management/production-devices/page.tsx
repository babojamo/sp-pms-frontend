'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useCallback, useEffect, useState } from 'react';
import type { Demo } from '@/types';
import PageCard from '@/app/components/page-card/component';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/constants/routes';
import Modal from '@/app/components/modal/component';
import { Device } from '@/app/types/device';
import { DeviceService } from '@/app/services/DeviceService';
import { Operator } from '@/app/types/operator';

interface DevicePageState {
  deleteModalShow?: boolean;
}

interface SearchFilter {
  keyword?: string;
}

const DevicesPage = () => {
  const [pageState, setPageState] = useState<DevicePageState>({});
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SearchFilter>({});
  const router = useRouter();

  const clearFilter1 = () => {
    setFilter({
      keyword: ''
    });
    fetchDevices();
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      keyword: value
    });
    fetchDevices();
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter1} />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={filter.keyword} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    );
  };

  const fetchDevices = useCallback(async () => {
    setLoading(true);
    const data = await DeviceService.getDevices();
    setDevices(getDevices(data));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const getDevices = (data: Device[]) => {
    return [...(data || [])].map((d) => {
      return d;
    });
  };

  const toolbars = () => {
    return (
      <>
        <Button label="New" onClick={() => router.push(ROUTES.DEVICES.CREATE)} icon="pi pi-plus" style={{ marginRight: '.5em' }} />
      </>
    );
  };

  const onActionDeleteClick = () => {
    setPageState({
      ...pageState,
      deleteModalShow: true
    });
  };

  const onActionEditClick = (id: string | number) => {
    router.push(`${ROUTES.DEVICES.EDIT}/${id}`);
  };

  const actionBodyTemplate = (rowData: Device) => {
    return (
      <>
        <Button icon="pi pi-pencil" onClick={() => onActionEditClick(rowData.id)} rounded severity="warning" className="mr-2" />
        <Button icon="pi pi-trash" onClick={() => onActionDeleteClick()} rounded severity="danger" />
      </>
    );
  };

  const attachedToBodyTemplate = (row: Device) => {
    return (
      <div className="flex flex-column">
        {row.operators?.map((operator: Operator) => (
          <>
            <a href="#">{operator.name}</a>
          </>
        ))}
      </div>
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <PageCard title="Devices Management" toolbar={toolbars()}>
          <DataTable value={devices} paginator className="p-datatable-gridlines" showGridlines rows={10} dataKey="id" filterDisplay="menu" loading={loading} responsiveLayout="scroll" emptyMessage="No customers found." header={renderHeader()}>
            <Column field="id" header="ID" style={{ minWidth: '12rem' }} />
            <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
            <Column field="device_id" header="Device ID" style={{ minWidth: '12rem' }} />
            <Column body={attachedToBodyTemplate} header="Attached To" style={{ minWidth: '12rem' }} />
            <Column field="created_by" header="Added By" style={{ minWidth: '12rem' }} />
            <Column body={actionBodyTemplate} headerStyle={{ width: 'auto' }}></Column>
          </DataTable>
          <Modal title="Delete Record" visible={pageState.deleteModalShow} onHide={() => setPageState({ ...pageState, deleteModalShow: false })} confirmSeverity="danger">
            <p>Are you sure you want to delete the record?</p>
          </Modal>
        </PageCard>
      </div>
    </div>
  );
};

export default DevicesPage;
