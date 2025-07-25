import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import {
  Quotation,
  QuotationRequest,
} from '../models/quotation-shared.interface';
import { QuotationService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class QuotationStateService {
  private _quotations = new BehaviorSubject<Quotation[]>([]);
  readonly quotations$: Observable<Quotation[]> =
    this._quotations.asObservable();

  private quotationsApiService = inject(QuotationService);

  loadAllQuotations(): void {
    this.quotationsApiService.getQuotations().subscribe(
      (quotations) => {
        this._quotations.next(quotations);
        console.log('Quotations loaded into state:', quotations);
      },
      (error) => {
        console.error('Error loading quotations into state:', error);
      }
    );
  }

  readonly last3Quotations$: Observable<Quotation[]> = this.quotations$.pipe(
    map((quotations) =>
      quotations
        .slice()
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 3)
    )
  );

  createQuotation(request: QuotationRequest): Observable<Quotation | null> {
    return this.quotationsApiService.createQuotation(request).pipe(
      tap(
        (response) => {
          console.log('Quotation added to backend:', response);
          this.loadAllQuotations();
        },
        (error) => {
          console.error(
            'Error adding quotation to backend, no state update:',
            error
          );
          throw error;
        }
      )
    );
  }

  deleteQuotation(quotationId: number): Observable<void> {
    const currentQuotations = this._quotations.getValue();
    const updatedQuotations = currentQuotations.filter(
      (q) => q.id !== quotationId
    );
    this._quotations.next(updatedQuotations);
    return this.quotationsApiService.deleteQuotation(quotationId).pipe(
      tap(
        (response) => {
          console.log('Quotation deleted from backend:', response);
        },
        (error) => {
          console.error(
            'Error deleting quotation from backend, rolling back state:',
            error
          );
          this._quotations.next(currentQuotations);
          throw error;
        }
      )
    );
  }
}
