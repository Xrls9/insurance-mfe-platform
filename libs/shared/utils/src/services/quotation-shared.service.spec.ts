import { TestBed } from '@angular/core/testing';
import { of, first } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Vehicle } from '../models';
import { QuotationService } from './quotation-shared.service';
import {
  Quotation,
  QuotationRequest,
} from '../models/quotation-shared.interface';
import { VehicleStateService } from '../states/vehicle.state.service';
import { QuotationStateService } from '../states/quotation.state.service';

class MockVehicleStateService {
  private mockVehicles: Vehicle[] = [
    {
      id: '1',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      typeOfUse: 'personal',
    },
    {
      id: '2',
      brand: 'Honda',
      model: 'Civic',
      year: 2019,
      typeOfUse: 'trabajo',
    },
    { id: '3', brand: 'Ford', model: 'F-150', year: 2021, typeOfUse: 'carga' },
  ];

  getVehicleSync(id: string): Vehicle | undefined {
    return this.mockVehicles.find((vehicle) => vehicle.id === id);
  }
}

class MockQuotationStateService {}

describe('QuotationService', () => {
  let service: QuotationService;
  let mockVehicleStateService: MockVehicleStateService;

  const initialQuotations: Quotation[] = [
    {
      id: 1,
      vehicle: {
        id: '1',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        typeOfUse: 'personal',
      },
      personAge: 30,
      basePrice: 1000,
      ageFactor: 0.9,
      totalQuotation: 900,
      createdAt: new Date('2023-01-01T10:00:00Z'),
    },
    {
      id: 2,
      vehicle: {
        id: '2',
        brand: 'Honda',
        model: 'Civic',
        year: 2019,
        typeOfUse: 'trabajo',
      },
      personAge: 20,
      basePrice: 1000,
      ageFactor: 1.5,
      totalQuotation: 1500,
      createdAt: new Date('2023-01-02T11:00:00Z'),
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuotationService,
        {
          provide: VehicleStateService,
          useClass: MockVehicleStateService,
        },
        {
          provide: QuotationStateService,
          useClass: MockQuotationStateService,
        },
      ],
    });

    service = TestBed.inject(QuotationService);
    mockVehicleStateService = TestBed.inject(
      VehicleStateService
    ) as unknown as MockVehicleStateService;

    (service as any)['quotations'] = [...initialQuotations];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getQuotations', () => {
    it('should return all quotations with a delay', async () => {
      const quotations = await service
        .getQuotations()
        .pipe(first())
        .toPromise();
      expect(quotations).toEqual(initialQuotations);
    });
  });

  describe('createQuotation', () => {
    it('should add a new quotation for a known vehicle and return it with a delay', async () => {
      const newQuotationRequest: QuotationRequest = {
        vehicleId: '3',
        personAge: 45,
      };

      const createdQuotation = await service
        .createQuotation(newQuotationRequest)
        .pipe(first())
        .toPromise();

      expect(createdQuotation).toBeDefined();
      expect(createdQuotation?.vehicle.id).toBe('3');
      expect(createdQuotation?.personAge).toBe(45);
      expect(createdQuotation?.ageFactor).toBe(0.9);
    });

    it('should return null if the vehicle ID does not exist', async () => {
      const newQuotationRequest: QuotationRequest = {
        vehicleId: '999',
        personAge: 30,
      };

      const createdQuotation = await service
        .createQuotation(newQuotationRequest)
        .pipe(first())
        .toPromise();

      expect(createdQuotation).toBeNull();
      const allQuotations = await service
        .getQuotations()
        .pipe(first())
        .toPromise();
      expect(allQuotations?.length).toBe(initialQuotations.length);
    });

    it('should calculate ageFactor correctly for age < 25', async () => {
      const newQuotationRequest: QuotationRequest = {
        vehicleId: '1',
        personAge: 20,
      };
      const createdQuotation = await service
        .createQuotation(newQuotationRequest)
        .pipe(first())
        .toPromise();
      expect(createdQuotation?.ageFactor).toBe(1.5);
      expect(createdQuotation?.totalQuotation).toBe(1500);
    });

    it('should calculate ageFactor correctly for age >= 60', async () => {
      const newQuotationRequest: QuotationRequest = {
        vehicleId: '1',
        personAge: 65,
      };
      const createdQuotation = await service
        .createQuotation(newQuotationRequest)
        .pipe(first())
        .toPromise();
      expect(createdQuotation?.ageFactor).toBe(1.3);
      expect(createdQuotation?.totalQuotation).toBe(1300);
    });

    it('should calculate ageFactor correctly for age between 25 and 60', async () => {
      const newQuotationRequest: QuotationRequest = {
        vehicleId: '1',
        personAge: 35,
      };
      const createdQuotation = await service
        .createQuotation(newQuotationRequest)
        .pipe(first())
        .toPromise();
      expect(createdQuotation?.ageFactor).toBe(0.9);
      expect(createdQuotation?.totalQuotation).toBe(900);
    });
  });

  // ---
  describe('deleteQuotation', () => {
    it('should remove a quotation by ID and return void with a delay', async () => {
      await service.deleteQuotation(1).pipe(first()).toPromise();

      const allQuotations = await service
        .getQuotations()
        .pipe(first())
        .toPromise();
      expect(allQuotations?.find((q) => q.id === 1)).toBeUndefined();
      expect(allQuotations?.length).toBe(initialQuotations.length - 1);
    });

    it('should not throw an error if the quotation ID does not exist', async () => {
      await service.deleteQuotation(999).pipe(first()).toPromise();

      const allQuotations = await service
        .getQuotations()
        .pipe(first())
        .toPromise();
      expect(allQuotations?.length).toBe(initialQuotations.length);
    });
  });
});
