import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  sortColumn: string = 'name';
  sortDirection: 'ascending' | 'descending' = 'ascending';
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() viewButton: boolean = true;
  @Input() editButton: boolean = true;
  @Input() deleteButton: boolean = true;
  @Input() approveButton: boolean = true;
  @Input() disapproveButton: boolean = true;
  @Output() viewRowEvent = new EventEmitter<any>();
  @Output() editRowEvent = new EventEmitter<any>();
  @Output() deleteRowEvent = new EventEmitter<any>();
  @Output() approveRowEvent = new EventEmitter<any>();
  @Output() disapproveRowEvent = new EventEmitter<any>();
  @Output() sort = new EventEmitter<any>();

  viewRow(item: any) {
    this.viewRowEvent.emit(item);
  }

  editRow(item: any) {
    this.editRowEvent.emit(item);
  }

  deleteRow(item: any) {
    this.deleteRowEvent.emit(item);
  }

  approveRow(item: any) {
    this.approveRowEvent.emit(item);
  }

  disapproveRow(item: any) {
    this.disapproveRowEvent.emit(item);
  }

  convertStatus(item: any) {
    console.log(item);
    if (item === 1) return 'Active';
    else if (item === 2) return 'In-Active';
    else return 'Deleted';
  }

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection =
        this.sortDirection === 'ascending' ? 'descending' : 'ascending';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'ascending';
    }
    this.sort.emit({ column: this.sortColumn, direction: this.sortDirection });
  }
}
