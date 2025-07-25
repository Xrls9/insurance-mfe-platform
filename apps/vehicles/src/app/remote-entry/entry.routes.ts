import { Route } from '@angular/router';
import { VehicleListComponent } from '../ui/templates/vehicle-list-template/vehicle-list-component';
import { VehicleFormPageComponent } from '../ui/templates/vehicle-template/vehicle-template.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: VehicleListComponent,
  },
  {
    path: 'new',
    component: VehicleFormPageComponent,
  },
  {
    path: 'edit/:id',
    component: VehicleFormPageComponent,
  },
  { path: '**', redirectTo: '' },
];
