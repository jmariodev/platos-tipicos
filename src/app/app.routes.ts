import { Routes } from '@angular/router';
import { Home } from './features/public/home/home';
import { Platos } from './features/public/platos/platos';
import { PlatoDetalle } from './features/public/plato-detalle/plato-detalle';
import { Login } from './features/auth/login';
import { authGuard } from './features/auth/auth.guard';
import { AdminLayout } from './features/admin/admin-layout/admin-layout';
import { AdminDashboard } from './features/admin/dashboard/dashboard';
import { AdminPlatos } from './features/admin/platos/admin-platos';
import { AdminCategorias } from './features/admin/categorias/admin-categorias';
import { AdminRegiones } from './features/admin/regiones/admin-regiones';
import { SaveModifyPlato } from './features/admin/platos/components/save-modify-plato/save-modify-plato';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'platos',
    component: Platos,
  },
  {
    path: 'platos/:regionId',
    component: Platos,
  },
  {
    path: 'plato-detalle/:id',
    component: PlatoDetalle,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: AdminDashboard },
      { path: 'platos', component: AdminPlatos },
      { path: 'platos/:id', component: SaveModifyPlato },
      { path: 'categorias', component: AdminCategorias },
      { path: 'regiones', component: AdminRegiones },
    ],
  },
];
