import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Vehicle } from '@vehicle-insurance-monorepo/shared-utils';

@Component({
  selector: 'app-vehicle-table-component',
  imports: [CommonModule],
  templateUrl: './vehicle-table-component.html',
  styleUrl: './vehicle-table-component.css',
})
export class VehicleTableComponent {
  @Input() vehicles: Vehicle[] | null = [];
  @Input() loading = false;

  @Output() editVehicle = new EventEmitter<Vehicle>();
  @Output() deleteVehicle = new EventEmitter<string>();

  hasVehicles(): boolean {
    return this.vehicles !== null && this.vehicles.length > 0;
  }

  onEdit(vehicle: Vehicle): void {
    this.editVehicle.emit(vehicle);
  }

  onDelete(vehicleId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
      this.deleteVehicle.emit(vehicleId);
    }
  }
}
