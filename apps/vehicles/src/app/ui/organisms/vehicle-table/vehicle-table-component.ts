import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Vehicle } from '@vehicle-insurance-monorepo/shared-utils';
import { SharedButtonComponent } from '@vehicle-insurance-monorepo/shared-ui';

@Component({
  selector: 'app-vehicle-table-component',
  imports: [CommonModule, SharedButtonComponent],
  templateUrl: './vehicle-table-component.html',
  styleUrl: './vehicle-table-component.css',
})
export class VehicleTableComponent {
  @Input() vehicles: Vehicle[] | null = [];
  @Input() loading = false;

  @Output() editVehicle = new EventEmitter<Vehicle>();
  @Output() deleteVehicle = new EventEmitter<string>();
  @Output() addVehicle = new EventEmitter<void>();

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
  onAdd(): void {
    this.addVehicle.emit();
  }
}
