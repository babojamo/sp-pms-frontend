/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const model: AppMenuItem[] = [
    {
      label: 'Home',
      items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/', disabled: true }]
    },
    {
      label: 'Operations',
      items: [
        { label: 'Operators Process', icon: 'pi pi-fw pi-id-card', to: '/operations/sewing-line-operations' },
        { label: 'Style Flow', icon: 'pi pi-fw pi-id-card', to: '/operations/style-flow', disabled: true }
      ]
    },
    {
      label: 'Management',
      items: [
        { label: 'Styles', icon: 'pi pi-fw pi-check-square', to: '/management/styles' },
        { label: 'Departments', icon: 'pi pi-fw pi-check-square', to: '/management/departments' },
        { label: 'Operators', icon: 'pi pi-fw pi-check-square', to: '/management/operators' },
        { label: 'Sewing Lines', icon: 'pi pi-fw pi-check-square', to: '/management/sewing-lines' },
        { label: 'Sewing Line Process', icon: 'pi pi-fw pi-check-square', to: '/management/processes' },
        { label: 'Process Offset', icon: 'pi pi-fw pi-check-square', to: '/management/process-offset' }
      ]
    },
    {
      label: 'Reports',
      items: [{ label: 'Sewing Line Output', icon: 'pi pi-fw pi-id-card', to: '/management/users', disabled: true }]
    },
    {
      label: 'Administrator',
      items: [{ label: 'Users', icon: 'pi pi-fw pi-id-card', to: '/administration/users' }]
    }
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
