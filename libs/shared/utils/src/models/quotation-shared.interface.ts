import { Vehicle } from './vehicle-shared.interface';

export interface QuotationRequest {
  vehicleId: string;
  personAge: number;
}

export interface Quotation {
  id: number;
  vehicle: Vehicle;
  personAge: number;
  basePrice: number;
  ageFactor: number;
  totalQuotation: number;
  createdAt: Date;
}
