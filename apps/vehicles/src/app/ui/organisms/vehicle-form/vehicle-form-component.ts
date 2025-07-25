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
  FormControl,
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
export class VehicleFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() record: Vehicle | null | undefined = null;
  @Input() submitLabel = 'Guardar';
  @Output() formSubmit = new EventEmitter<Vehicle>();
  @Output() formCancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    id: null,
    brand: ['', Validators.required],
    model: ['', Validators.required],
    year: [1900, [Validators.required, Validators.min(1900)]],
    typeOfUse: ['personal', Validators.required],
  });

  ngOnInit(): void {
    this.loadRecord();
    console.log('record', this.record);
    console.log('form', this.form.value);
  }

  ngOnDestroy(): void {
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['record'] && this.record) {
      this.form.patchValue(this.record);
    } else if (changes['record'] && this.record === null && this.form) {
      this.resetForm();
    }
  }

  loadRecord() {
    if (this.record) {
      this.form.patchValue(this.record);
    } else {
      this.resetForm();
    }
  }
  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.formSubmit.emit(this.form.value);
  }

  onCancel(): void {
    this.form.reset();
    this.formCancel.emit();
  }

  resetForm(): void {
    this.form.reset({
      id: null,
      brand: '',
      model: '',
      typeOfUse: 'personal',
      year: 1900,
    });
  }

  getFormControl(name: string): FormControl {
    const control = this.form.get(name);
    if (control instanceof FormControl) {
      return control;
    }
    throw new Error(`Control '${name}' not found or is not a FormControl.`);
  }
}
