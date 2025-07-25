import { CommonModule, NgIf } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
} from '@angular/core';
import { SharedInputComponent, SharedLabelComponent } from '../../atoms';

@Component({
  selector: 'lib-shared-form-field',
  imports: [CommonModule, NgIf, SharedLabelComponent],
  templateUrl: './shared-form-field.component.html',
  styleUrls: ['./shared-form-field.component.scss'],
})
export class SharedFormFieldComponent implements AfterContentInit {
  @Input() label = '';
  @Input() forId = '';
  @Input() required = false;
  @Input() errorMessage: string | null = null;

  @ContentChild(SharedInputComponent) inputComponent?: SharedInputComponent;

  ngAfterContentInit(): void {
    if (!this.forId) {
      console.warn(
        'FormFieldComponent: No "forId" provided and could not derive it from projected content. Label might not be properly associated.'
      );
    }
  }
}
