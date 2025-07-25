import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-shared-label',
  imports: [CommonModule],
  templateUrl: './shared-label.component.html',
  styleUrls: ['./shared-label.component.scss'],
})
export class SharedLabelComponent {
  @Input() forId = '';
  @Input() required = false;
}
