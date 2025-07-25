import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
  OnDestroy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '@vehicle-insurance-monorepo/shared-utils';
import {
  SharedButtonComponent,
  SharedFormFieldComponent,
  SharedInputComponent,
} from '@vehicle-insurance-monorepo/shared-ui';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-vehicle-form-component',
  imports: [
    CommonModule,
    SharedButtonComponent,
    SharedInputComponent,
    SharedFormFieldComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './vehicle-form-component.html',
  styleUrl: './vehicle-form-component.css',
})
export class VehicleFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() vehicle: Vehicle | null | undefined = null;
  @Input() submitLabel = 'Guardar';

  @Output() formSubmit = new EventEmitter<Vehicle>();
  @Output() formCancel = new EventEmitter<void>();

  vehicleForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicle'] && !changes['vehicle'].firstChange) {
      const currentVehicleValue = changes['vehicle'].currentValue;
      if (currentVehicleValue) {
        this.vehicleForm.patchValue(currentVehicleValue);
      } else {
        this.resetForm();
      }
    }
  }

  ngOnDestroy(): void {
    this.resetForm();
  }

  private getInitialValue(): Vehicle {
    return {
      id: '',
      brand: '',
      model: '',
      year: 0,
      typeOfUse: 'personal',
    };
  }

  private initForm(): void {
    this.vehicleForm = this.fb.group({
      id: [''],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear() + 1),
        ],
      ],
      typeOfUse: ['personal', Validators.required],
    });

    if (this.vehicle) {
      this.vehicleForm.patchValue(this.vehicle);
    }
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      this.formSubmit.emit(this.vehicleForm.value);
      if (!this.vehicleForm.value.id) {
        this.resetForm();
      }
    }
  }

  onCancel(): void {
    this.resetForm();
    this.formCancel.emit();
  }

  resetForm(): void {
    this.vehicleForm.reset(this.getInitialValue);
  }

  get f() {
    return this.vehicleForm.controls;
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.f[controlName];
    if (control?.touched && control.invalid) {
      if (control.errors?.['required']) {
        return 'Este campo es requerido.';
      }
      if (control.errors?.['min']) {
        return `El año debe ser al menos ${control.errors['min'].min}.`;
      }
      if (control.errors?.['max']) {
        return `El año no puede ser mayor a ${control.errors['max'].max}.`;
      }
      return 'Valor inválido.';
    }
    return null;
  }
}
