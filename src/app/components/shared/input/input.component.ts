import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label!: string;
  @Input() type!: string;
  @Input() formControl: FormControl = new FormControl('');
  @Input() placeholder!: string;
  @Input() value: string = '';
  @Input() required: boolean = true;
  @Input() pattern!: string;
  @Input() readonly: boolean = false;
  @Input() size!: number;
  @Input() class!: string;
  @Input() ngClass!: any;
  @Input() maxlength!: number;
  @Input() minlength!: number;
  @Input() name!: string;
  @Input() styles: any = '';

  @Output() onKeyup: EventEmitter<string> = new EventEmitter<string>();

  onKeyUp(inputValue: string) {
    this.onKeyup.emit(inputValue);
  }
}
