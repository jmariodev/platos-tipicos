import { Routes } from '@angular/router';
import { Home } from './features/public/home/home';
import { Platos } from './features/public/platos/platos';
import { PlatoDetalle } from './features/public/plato-detalle/plato-detalle';
import { AdminLayout } from './features/admin/admin-layout/admin-layout';
import { AdminDashboard } from './features/admin/dashboard/dashboard';
import { AdminPlatos } from './features/admin/platos/admin-platos';
import { AdminPlatoForm } from './features/admin/platos/admin-plato-form';
import { AdminCategorias } from './features/admin/categorias/admin-categorias';
import { AdminRegiones } from './features/admin/regiones/admin-regiones';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'platos',
        component: Platos
    },
    {
        path: 'platos/:regionId',
        component: Platos
    },
    {
        path: 'plato-detalle/:id',
        component: PlatoDetalle
    },
    {
        path: 'admin',
        component: AdminLayout,
        children: [
            { path: '', component: AdminDashboard },
            { path: 'platos', component: AdminPlatos },
            { path: 'platos/crear', component: AdminPlatoForm },
            { path: 'platos/:id', component: AdminPlatoForm },
            { path: 'categorias', component: AdminCategorias },
            { path: 'regiones', component: AdminRegiones },
        ]
    }
];
