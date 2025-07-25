import { Route } from '@angular/router';
import { VehicleListComponent } from './ui/templates/vehicle-list-template/vehicle-list-component';
import { VehicleFormPageComponent } from './ui/templates/vehicle-template/vehicle-template.component';

export const appRoutes: Route[] = [
  {
    path: 'vehicles',
    component: VehicleListComponent,
  },
  {
    path: 'vehicles/new',
    component: VehicleFormPageComponent,
  },
  {
    path: 'vehicles/edit/:id',
    component: VehicleFormPageComponent,
  },
  { path: '**', redirectTo: '' },
];
