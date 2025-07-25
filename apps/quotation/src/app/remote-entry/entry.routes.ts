import { Route } from '@angular/router';
import { QuotationListComponent } from '../ui/templates/quotation-list-template/quotation-list-component';
import { QuotationFormPageComponent } from '../ui/templates/quotation-template/quotation-template.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: QuotationListComponent,
  },
  {
    path: 'new',
    component: QuotationFormPageComponent,
  },
  { path: '**', redirectTo: '' },
];
