/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Operations',
            items: [
                { label: 'Style Flow', icon: 'pi pi-fw pi-id-card', to: '/pages/operations/style-flow' },
                { label: 'Sewing Line Output', icon: 'pi pi-fw pi-id-card', to: '/pages/management/users' },
            ]
        },
        {
            label: 'Management',
            items: [
                { label: 'Styles', icon: 'pi pi-fw pi-check-square', to: '/pages/management/styles' },
                { label: 'Departments', icon: 'pi pi-fw pi-check-square', to: '/pages/management/departments' },
                { label: 'Operators', icon: 'pi pi-fw pi-check-square', to: '/pages/management/operators' },
                { label: 'Sewing Lines', icon: 'pi pi-fw pi-check-square', to: '/pages/management/sewing-lines' },
                { label: 'Production Process', icon: 'pi pi-fw pi-check-square', to: '/pages/management/processes' },
            ]
        },
         {
            label: 'Reports',
            items: [
                { label: 'Sewing Line Output', icon: 'pi pi-fw pi-id-card', to: '/pages/management/users' },
            ]
        },
        {
            label: 'Administrator',
            items: [
                { label: 'Users', icon: 'pi pi-fw pi-id-card', to: '/pages/administration/users' },
            ]

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
