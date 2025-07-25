import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { VehicleFormComponent } from '../../organisms/vehicle-form/vehicle-form-component';
import {
  Vehicle,
  VehicleStateService,
} from '@vehicle-insurance-monorepo/shared-utils';
import { Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-template',
  standalone: true,
  imports: [CommonModule, VehicleFormComponent],
  templateUrl: './vehicle-template.component.html',
  styleUrls: ['./vehicle-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormPageComponent implements OnInit {
  submitLabel = 'Crear';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private vehicleStateService = inject(VehicleStateService);

  selectedVehicle$: Observable<Vehicle | undefined> = this.route.paramMap.pipe(
    switchMap((params) => {
      const vehicleId = params.get('id');
      if (vehicleId && vehicleId !== 'new') {
        this.submitLabel = 'Actualizar';
        return this.vehicleStateService.getVehicleById(vehicleId);
      } else {
        this.submitLabel = 'Crear';
        return of(undefined);
      }
    })
  );

  ngOnInit(): void {
    this.vehicleStateService.loadAllVehicles();
  }

  onVehicleFormSubmit(vehicle: Vehicle): void {
    if (vehicle.id) {
      this.vehicleStateService.updateVehicle(vehicle).subscribe(
        () => {
          alert('Vehículo actualizado correctamente.');
          this.onFormCancel();
        },
        (error) => {
          alert(`Error al actualizar vehículo: ${error}`);
        }
      );
    } else {
      this.vehicleStateService.addVehicle(vehicle).subscribe(
        () => {
          alert('Vehículo creado correctamente.');
          this.onFormCancel();
        },
        (error) => {
          alert(`Error al actualizar vehículo: ${error}`);
        }
      );
    }
  }

  onFormCancel(): void {
    this.router.navigate(['/vehicles']);
  }
}
