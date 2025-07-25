import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-shared-button',
  imports: [CommonModule],
  templateUrl: './shared-button.component.html',
  styleUrls: ['./shared-button.component.scss'],
})
export class SharedButtonComponent {
  @Input() label = 'Click Me';
  @Input() disabled = false;
  @Input() appearance: 'primary' | 'secondary' = 'primary';
  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
