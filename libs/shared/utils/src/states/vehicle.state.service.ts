import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, tap } from 'rxjs';
import { Vehicle } from '../models';
import { VehiclesService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class VehicleStateService {
  private _vehicles = new BehaviorSubject<Vehicle[]>([]);
  readonly vehicles$: Observable<Vehicle[]> = this._vehicles.asObservable();

  private vehiclesApiService = inject(VehiclesService);

  loadAllVehicles(): void {
    this.vehiclesApiService.getVehicles().subscribe(
      (vehicles) => {
        this._vehicles.next(vehicles);
        console.log('Vehicles loaded into state:', vehicles);
      },
      (error) => {
        console.error('Error loading vehicles into state:', error);
      }
    );
  }

  addVehicle(newVehicle: Vehicle): Observable<any> {
    return this.vehiclesApiService.createVehicle(newVehicle).pipe(
      tap(
        (response) => {
          console.log('Vehicle added to backend:', response);
          this.loadAllVehicles();
        },
        (error) => {
          console.error(
            'Error adding vehicle to backend, no state update:',
            error
          );
          throw error;
        }
      )
    );
  }

  updateVehicle(updatedVehicle: Vehicle): Observable<any> {
    const currentVehicles = this._vehicles.getValue();
    const updatedList = currentVehicles.map((vehicle) =>
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
    );
    this._vehicles.next(updatedList);

    return this.vehiclesApiService.updateVehicle(updatedVehicle).pipe(
      tap(
        (response) => {
          console.log('Vehicle updated in backend:', response);
        },
        (error) => {
          console.error(
            'Error updating vehicle in backend, rolling back state:',
            error
          );
          this._vehicles.next(currentVehicles);
          throw error;
        }
      )
    );
  }

  deleteVehicle(vehicleId: string): Observable<any> {
    const currentVehicles = this._vehicles.getValue();
    const filteredList = currentVehicles.filter(
      (vehicle) => vehicle.id !== vehicleId
    );
    this._vehicles.next(filteredList);

    return this.vehiclesApiService.deleteVehicle(vehicleId).pipe(
      tap(
        (response) => {
          console.log('Vehicle deleted from backend:', response);
        },
        (error) => {
          console.error(
            'Error deleting vehicle from backend, rolling back state:',
            error
          );
          this._vehicles.next(currentVehicles);
          throw error;
        }
      )
    );
  }

  getVehicleById(id: string): Observable<Vehicle | undefined> {
    return this.vehicles$.pipe(
      map((vehicles) => vehicles.find((vehicle) => vehicle.id === id))
    );
  }
}
