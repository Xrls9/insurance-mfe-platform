import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Vehicle } from '../models/vehicle-shared.interface';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private apiUrl = '/api/vehicles';
  private vehicles: Vehicle[] = [
    {
      id: '1',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      typeOfUse: 'personal',
    },
    { id: '2', brand: 'Honda', model: 'Civic', year: 2019, typeOfUse: 'work' },
    { id: '3', brand: 'Ford', model: 'F-150', year: 2021, typeOfUse: 'cargo' },
  ];

  private http = inject(HttpClient);

  getVehicles(): Observable<Vehicle[]> {
    return of(this.vehicles).pipe(delay(500));
  }

  getVehicle(id: string): Observable<Vehicle | undefined> {
    return of(this.vehicles.find((v) => v.id === id)).pipe(delay(300));
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const newVehicle = {
      ...vehicle,
      id: (this.vehicles.length + 1).toString(),
    };
    this.vehicles.push(newVehicle);
    return of(newVehicle).pipe(delay(300));
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const index = this.vehicles.findIndex((v) => v.id === vehicle.id);
    if (index > -1) {
      this.vehicles[index] = vehicle;
    }
    return of(vehicle).pipe(delay(300));
  }

  deleteVehicle(id: string): Observable<void> {
    this.vehicles = this.vehicles.filter((v) => v.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
