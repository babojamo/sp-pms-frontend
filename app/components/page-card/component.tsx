/* eslint-disable @next/next/no-sync-scripts */
import { BreadCrumb } from 'primereact/breadcrumb';
import React from 'react';

interface PageCardProps {
  title?: any;
  children?: any;
  toolbar?: React.ReactNode;
}

const PageCard = ({ title, children, toolbar }: PageCardProps) => {
  const items = [{ label: 'Electronics' }, { label: 'Computer' }, { label: 'Accessories' }, { label: 'Keyboard' }, { label: 'Wireless' }];
  const home = { icon: 'pi pi-home', url: 'https://primereact.org' };

  return (
    <>
      <BreadCrumb model={items} home={home} />
      <div className="card mt-2">
        <div className="flex align-items-center">
          <h5>{title ?? 'Page Card'}</h5>
          <div className="ml-auto pb-3">{toolbar}</div>
        </div>
        {children}
      </div>
    </>
  );
};

export default PageCard;
