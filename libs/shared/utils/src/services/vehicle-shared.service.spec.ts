import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Vehicle } from '../models/vehicle-shared.interface';
import { VehiclesService } from './index';
import { first } from 'rxjs';

describe('VehiclesService', () => {
  let service: VehiclesService;

  const initialVehicles: Vehicle[] = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiclesService, provideHttpClient()],
      //providers: [VehiclesService, provideHttpClientTesting()],
    });

    service = TestBed.inject(VehiclesService);
    (service as any)['vehicles'] = [...initialVehicles];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getVehicles', () => {
    it('should return all vehicles with a delay', async () => {
      const vehicles = await service.getVehicles().pipe(first()).toPromise();
      expect(vehicles).toEqual(initialVehicles);
    });
  });

  describe('getVehicle', () => {
    it('should return a specific vehicle by ID with a delay', async () => {
      const vehicle = await service.getVehicle('1').pipe(first()).toPromise();
      expect(vehicle).toEqual(initialVehicles[0]);
    });

    it('should return undefined if vehicle ID does not exist', async () => {
      const vehicle = await service.getVehicle('999').pipe(first()).toPromise();
      expect(vehicle).toBeUndefined();
    });
  });

  describe('createVehicle', () => {
    it('should add a new vehicle and return it with a delay', async () => {
      const newVehicleData: Vehicle = {
        brand: 'Nissan',
        model: 'Versa',
        year: 2023,
        typeOfUse: 'personal',
      };
      const createdVehicle = await service
        .createVehicle(newVehicleData)
        .pipe(first())
        .toPromise();
      expect(createdVehicle).toEqual(expect.objectContaining(newVehicleData));
      const allVehicles = await service.getVehicles().pipe(first()).toPromise();
      expect(allVehicles).toContainEqual(createdVehicle);
    });
  });

  describe('updateVehicle', () => {
    it('should update an existing vehicle and return the updated vehicle with a delay', async () => {
      const updatedVehicleData: Vehicle = {
        id: '1',
        brand: 'Toyota',
        model: 'Corolla GR',
        year: 2022,
        typeOfUse: 'personal',
      };
      const updatedVehicle = await service
        .updateVehicle(updatedVehicleData)
        .pipe(first())
        .toPromise();

      expect(updatedVehicle).toEqual(updatedVehicleData);

      const vehicleInService = await service
        .getVehicle('1')
        .pipe(first())
        .toPromise();
      expect(vehicleInService).toEqual(updatedVehicleData);
    });

    it('should not update if vehicle ID does not exist', async () => {
      const nonExistentVehicle: Vehicle = {
        id: '999',
        brand: 'NonExistent',
        model: 'Car',
        year: 2000,
        typeOfUse: 'personal',
      };
      await service.updateVehicle(nonExistentVehicle).pipe(first()).toPromise();

      const allVehicles = await service.getVehicles().pipe(first()).toPromise();
      expect(allVehicles?.find((v) => v.id === '999')).toBeUndefined();
    });
  });

  describe('deleteVehicle', () => {
    it('should remove a vehicle by ID and return void with a delay', async () => {
      await service.deleteVehicle('2').pipe(first()).toPromise();

      const allVehicles = await service.getVehicles().pipe(first()).toPromise();
      expect(allVehicles?.find((v) => v.id === '2')).toBeUndefined();
    });
  });
});
