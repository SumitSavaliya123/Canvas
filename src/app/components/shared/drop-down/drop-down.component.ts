import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DropdownItem } from 'src/app/models/drop-down-item';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
@Injectable()
export class DropDownComponent {
  @Output() selectionChange = new EventEmitter<string | number>();
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() optionItems: DropdownItem[] = [];
  @Input() errorString: string = '';
  @Input() selectValue: string = '1';
  selectedValue: string = '';
  errorMessage: string = '';

  constructor() {}

  saveSelection(query: any) {
    // if (this.selectedValue != '') {
    this.selectionChange.emit(query.value);
    // }
  }
}
