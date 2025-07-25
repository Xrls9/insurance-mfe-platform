import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedButtonComponent } from '@vehicle-insurance-monorepo/shared-ui';
import { Quotation } from '@vehicle-insurance-monorepo/shared-utils';

@Component({
  selector: 'app-quotation-table-component',
  imports: [CommonModule, SharedButtonComponent],
  templateUrl: './quotation-table-component.html',
  styleUrl: './quotation-table-component.css',
})
export class QuotationTableComponent {
  @Input() quotations: Quotation[] | null = [];
  @Input() loading = false;

  @Output() deleteQuotation = new EventEmitter<string>();
  @Output() addQuotation = new EventEmitter<void>();

  hasVehicles(): boolean {
    return this.quotations !== null && this.quotations.length > 0;
  }

  onDelete(vehicleId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
      this.deleteQuotation.emit('' + vehicleId);
    }
  }
  onAdd(): void {
    this.addQuotation.emit();
  }
}
