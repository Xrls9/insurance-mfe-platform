import { inject } from '@angular/core';
import { VehicleStateService } from '../states/vehicle.state.service';
import { delay, Observable, of } from 'rxjs';
import {
  Quotation,
  QuotationRequest,
} from '../models/quotation-shared.interface';
import { QuotationStateService } from '../states/quotation.state.service';

export class QuotationService {
  private vehicleStateService = inject(VehicleStateService);
  private quotationStateService = inject(QuotationStateService);

  private quotations: Quotation[] = [];

  getQuotations(): Observable<Quotation[]> {
    return of(this.quotations).pipe(delay(500));
  }

  createQuotation(request: QuotationRequest): Observable<Quotation | null> {
    const { vehicleId, personAge } = request;

    const vehicle = this.vehicleStateService.getVehicleSync(vehicleId);

    if (!vehicle) {
      console.error(
        `Error: Vehículo con ID ${vehicleId} no encontrado para la cotización.`
      );
      return of(null);
    }

    let ageFactor = 1;
    if (personAge < 25) {
      ageFactor = 1.5;
    } else if (personAge >= 60) {
      ageFactor = 1.3;
    } else {
      ageFactor = 0.9;
    }

    const basePrice = 1000;
    const totalQuotation = basePrice * ageFactor;

    const newQuotation: Quotation = {
      id: this.quotations.length + 1,
      ageFactor,
      basePrice,
      createdAt: new Date(),
      personAge,
      totalQuotation,
      vehicle: { ...vehicle },
    };

    this.quotations.push(newQuotation);
    return of(newQuotation).pipe(delay(300));
  }

  deleteQuotation(id: number): Observable<void> {
    this.quotations = this.quotations.filter(
      (quotation) => quotation.id !== id
    );
    return of(undefined).pipe(delay(300));
  }
}
