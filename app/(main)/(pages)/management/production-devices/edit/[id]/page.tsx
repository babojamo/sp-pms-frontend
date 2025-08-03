'use client';
import React, { useCallback, useEffect, useState } from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import { SelectItem } from 'primereact/selectitem';
import { DeviceForm } from '@/app/types/device';
import { DeviceService } from '@/app/services/DeviceService';
import FormDevice from '@/app/components/devices/FormDevice';

interface EditDevicePageProps {
  params?: { id: any };
}

const EditDevicePage = ({ params }: EditDevicePageProps) => {
  const router = useRouter();
  const [device, setDevice] = useState<DeviceForm | undefined>();

  const getDevice = useCallback(async () => {
    setDevice((await DeviceService.getDevice(params?.id)) as DeviceForm);
  }, [params?.id]);

  useEffect(() => {
    if (params?.id) {
      getDevice();
    }
  }, [params?.id, getDevice]);

  return (
    <div className="grid">
      <div className="col-6">
        <PageCard title="Edit Device" toolbar={<PageAction actionBack={() => router.push(ROUTES.DEVICES.INDEX)} actions={[PageActions.BACK]} />}>
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormDevice value={device} onSubmit={() => {}}>
                  <FormAction actionCancel={() => router.push(ROUTES.DEVICES.INDEX)} actions={[FormActions.CANCEL, FormActions.UPDATE]} />
                </FormDevice>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default EditDevicePage;
