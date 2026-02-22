import { Routes } from '@angular/router';
import { Home } from './features/public/home/home';
import { Platos } from './features/public/platos/platos';
import { PlatoDetalle } from './features/public/plato-detalle/plato-detalle';

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
  },{
    path: 'plato-detalle/:id',
    component: PlatoDetalle
  }
];
