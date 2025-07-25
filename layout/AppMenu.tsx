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
            label: 'Management',
            items: [
                { label: 'Users', icon: 'pi pi-fw pi-id-card', to: '/pages/management/users' },
                { label: 'Styles', icon: 'pi pi-fw pi-check-square', to: '/pages/management/styles' },
                { label: 'Departments', icon: 'pi pi-fw pi-check-square', to: '/pages/management/departments' },
                { label: 'Operators', icon: 'pi pi-fw pi-check-square', to: '/pages/management/operators' },
                { label: 'Production Process', icon: 'pi pi-fw pi-check-square', to: '/pages/management/process' },
                { label: 'Reports', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
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
