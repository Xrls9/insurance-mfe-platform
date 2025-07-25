import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Vehicle,
  VehicleStateService,
} from '@vehicle-insurance-monorepo/shared-utils';
import { VehicleTableComponent } from '../../organisms/vehicle-table/vehicle-table-component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list-component',
  imports: [CommonModule, VehicleTableComponent],
  templateUrl: './vehicle-list-component.html',
  styleUrl: './vehicle-list-component.css',
})
export class VehicleListComponent implements OnInit {
  isLoading = false;
  selectedVehicle: Vehicle | null = null;

  private vehicleStateService = inject(VehicleStateService);
  private _vehicles: Observable<Vehicle[]> = this.vehicleStateService.vehicles$;
  private router = inject(Router);

  ngOnInit(): void {
    this.isLoading = true;
    this.vehicleStateService.loadAllVehicles();
    this._vehicles.subscribe(() => {
      this.isLoading = false;
    });
  }
  get vehicles(): Observable<Vehicle[]> {
    return this._vehicles;
  }

  onAddVehicle(): void {
    this.router.navigate(['/vehicles', 'new']);
  }

  onEditVehicle(vehicle: Vehicle): void {
    this.router.navigate(['/vehicles', 'edit', vehicle.id]);
  }

  onDeleteVehicle(vehicleId: string): void {
    this.vehicleStateService.deleteVehicle(vehicleId).subscribe(
      () => {
        alert('Vehículo eliminado correctamente.');
      },
      (error) => {
        alert('Error al eliminar vehículo.');
      }
    );
  }
}
