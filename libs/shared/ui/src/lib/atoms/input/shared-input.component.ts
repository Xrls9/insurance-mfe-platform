import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-shared-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shared-input.component.html',
  styleUrls: ['./shared-input.component.scss'],
})
export class SharedInputComponent implements OnInit {
  @Input() id = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() control!: FormControl;
  @Input() disabled = false;

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl();
    }
  }
}
