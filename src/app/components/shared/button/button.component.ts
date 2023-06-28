import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: string = '';
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() btnClass: any = '';
  @Input() title: string = '';
  @Input() styles: any = '';
  @Input() className: string = '';
  @Input() iconName: any = '';

  @Output() btnClick: EventEmitter<any> = new EventEmitter<any>();

  name: string = 'clicked';

  handleClick() {
    this.btnClick.emit(this.name);
  }
}
