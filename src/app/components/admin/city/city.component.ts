import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
import { CityService } from 'src/app/services/city.service';
import { GetListRequest } from 'src/app/models/get-list-request';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent {
  length: number = 0;
  pageSizeOptions: number[] = [5, 10, 15];
  citySerachInputField = {
    padding: '15px',
    marginBottom: '20px',
  };
  cityListRequest: GetListRequest = {
    pageIndex: 0,
    pageSize: 5,
    sortOrder: '',
    sortColumn: '',
    searchQuery: '',
  };
  respondedList: any;
  columns = ['countryName', 'name', 'status', 'Action'];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _cityService: CityService
  ) {}

  clickOnAddCityButton() {
    this.router.navigate(['/admin/city/addcity']);
  }

  onKeyUp(item: any) {
    console.log(item);
  }

  viewCityDetails(item: any) {
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: {
        modalTitle: 'City Details',
        modalDescription: [
          'Name: ' + item.name,
          'Status: ' + (item.status == 1 ? 'Active' : 'In-active'),
        ],
        actionButtonText: 'Edit',
        cancleButtonText: 'Delete',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == true) {
        this.router.navigate(['/admin/city/editcity/' + item.id]);
      } else if (result == false) {
        this.deleteCity(item);
      }
    });
  }

  deleteCity(item: any) {
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: {
        modalTitle: 'Delete Country',
        modalDescription: ['Are you sure wants to delete ?'],
        actionButtonText: 'Delete',
        cancleButtonText: 'Cancel',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == true) {
        this._cityService.deleteCountry(item.id).subscribe((res: any) => {
          this.respondedList = this.respondedList.filter(
            (x: any) => x.id != item.id
          );
        });
      }
    });
  }

  clickOnEditCityButton(item: any) {
    this.router.navigate(['/admin/city/editcity/' + item.id]);
  }

  sortCityDetails(event: any) {
    console.log(event);
    if (event.column !== 'Action') {
      this.cityListRequest.sortColumn = event.column;
      this.cityListRequest.sortOrder = event.direction;
      console.log(event.column + '  ' + event.direction);
      this.callCity(this.cityListRequest);
    }
  }

  callCity(pagination: GetListRequest) {
    this._cityService.getAllCountry(pagination).subscribe((res: any) => {
      this.respondedList = res.content.records;
      this.length = res.content.totalRecords;
    });
  }

  onChangePage(page: any) {
    this.cityListRequest.pageIndex = page.pageIndex + 1;
    this.cityListRequest.pageSize = page.pageSize;
    this.callCity(this.cityListRequest);
  }
}
