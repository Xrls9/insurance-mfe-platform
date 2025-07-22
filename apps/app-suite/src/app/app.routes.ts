import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'quotation',
    loadChildren: () =>
      import('quotation/Module').then((m) => m!.RemoteEntryModule),
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('vehicles/Module').then((m) => m!.RemoteEntryModule),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
