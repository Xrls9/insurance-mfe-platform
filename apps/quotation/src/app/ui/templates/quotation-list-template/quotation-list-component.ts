import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Quotation,
  QuotationStateService,
} from '@vehicle-insurance-monorepo/shared-utils';
import { QuotationTableComponent } from '../../organisms/quotation-table/quotation-table-component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation-list-component',
  imports: [CommonModule, QuotationTableComponent],
  templateUrl: './quotation-list-component.html',
  styleUrl: './quotation-list-component.css',
})
export class QuotationListComponent implements OnInit {
  isLoading = false;

  private quotationStateService = inject(QuotationStateService);

  private _quotations: Observable<Quotation[]> =
    this.quotationStateService.quotations$;
  private router = inject(Router);

  ngOnInit(): void {
    this.isLoading = true;
    this.quotationStateService.loadAllQuotations();
    this._quotations.subscribe(() => {
      this.isLoading = false;
    });
  }
  get quotations(): Observable<Quotation[]> {
    return this._quotations;
  }

  onAddVehicle(): void {
    this.router.navigate(['/quotation', 'new']);
  }

  onDeleteQuotation(quotationId: string): void {
    this.quotationStateService.deleteQuotation(+quotationId).subscribe(
      () => {
        alert('Cotizacion eliminada correctamente.');
      },
      (error) => {
        alert('Error al eliminar cotizacion.');
      }
    );
  }
}
