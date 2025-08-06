'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useRef, useState } from 'react';
import Link from 'next/link';

import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { NodeRef } from '@/types';
import { classNames } from 'primereact/utils';
import { useRouter } from 'next/navigation';
import FormDropdown from '@/app/components/form/dropdown/component';
import FormInputText from '@/app/components/form/input-text/component';
import Barcode from '@/app/components/barcode/Barcode';
import { ListBox } from 'primereact/listbox';
import { SelectItem } from 'primereact/selectitem';

interface StyleDetail {
  name: string;
  value: string;
}

const LandingPage = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const menuRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState<string | number | null>();
  const [departmentOption, setDepartmentOption] = useState<SelectItem[]>([
    {
      label: 'Department 1',
      value: '1'
    },
    {
      label: 'Department 2',
      value: '2'
    }
  ]);

  const [details, setDetails] = useState<StyleDetail[]>([
    { name: 'Style Number', value: 'HP58JF207' },
    { name: 'Pleats Name', value: 'AGATE' },
    { name: 'Previous Department', value: 'Basting' },
    { name: 'Current Department', value: 'Machine Pleats' },
    { name: 'Time In', value: 'Aug 5, 2025 01:00' },
    { name: 'Time Out', value: '---' }
  ]);

  const itemTemplate = (item: StyleDetail) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
          <span className="font-bold">{item.name}</span>
        </div>
        <span className="font-bold text-900">{item.value}</span>
      </div>
    );
  };

  return (
    <>
      <div className="surface-0 flex align-items-center flex-row p-5">
        <div className="flex align-items-center gap-2">
          <FormDropdown value={selectedDepartment} label="Department" placeholder="Select department" options={departmentOption} />
          <Button label="Save" icon="pi pi-save" className="mt-2"></Button>
          <Button label="Login" className="mt-2" onClick={() => router.push('/')}></Button>
        </div>
        <div id="home" className="landing-wrapper overflow-hidden">
          <div className="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static">
            <Link href="/" className="flex align-items-center">
              <img src={`/layout/images/${layoutConfig.colorScheme === 'light' ? 'logo-dark' : 'logo-white'}.svg`} alt="Sun Pleats Logo" height="50" className="mr-0 lg:mr-2" />
              <span className="text-900 font-medium text-2xl line-height-3 mr-8">Sunpleats Kiosk</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="card m-5">
        <div className="card-body">
          <div className="flex flex-column align-items-center m-auto m-5">
            <Barcode value={'HP58JF207'} />
          </div>
          <ListBox filter={false} dataKey="id" options={details} itemTemplate={itemTemplate} />
          <div className="m-5">
            <FormInputText className="w-full" placeholder="Please scan the barcode here" inputClassName="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
