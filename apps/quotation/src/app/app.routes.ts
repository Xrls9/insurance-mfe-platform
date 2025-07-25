import { Route } from '@angular/router';
import { QuotationListComponent } from './ui/templates/quotation-list-template/quotation-list-component';
import { QuotationFormPageComponent } from './ui/templates/quotation-template/quotation-template.component';

export const appRoutes: Route[] = [
  {
    path: 'quotation',
    component: QuotationListComponent,
  },
  {
    path: 'quotation/new',
    component: QuotationFormPageComponent,
  },
  { path: '**', redirectTo: '' },
];
