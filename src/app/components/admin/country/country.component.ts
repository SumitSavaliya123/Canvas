import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GetListRequest } from 'src/app/models/get-list-request';
import { CountryService } from 'src/app/services/country.service';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  length: number = 0;
  pageSizeOptions: number[] = [5, 10, 15];
  countryListRequest: GetListRequest = {
    pageIndex: 0,
    pageSize: 5,
    sortOrder: '',
    sortColumn: '',
    searchQuery: '',
  };
  countrySerachInputField = {
    padding: '15px',
    marginBottom: '20px',
  };
  respondedList: any;
  columns = ['name', 'status', 'Action'];
  searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    private countryService: CountryService,
    public dialog: MatDialog,
    private router: Router,
    private _authService : AuthService
  ) {}

  ngOnInit() {
    this._authService.validateToken();
    this.callCountry(this.countryListRequest);
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((searchText: string) => {
        this.getSearchedCountry(searchText);
      });
  }

  onChangePage(page: any) {
    this.countryListRequest.pageIndex = page.pageIndex + 1;
    this.countryListRequest.pageSize = page.pageSize;
    this.callCountry(this.countryListRequest);
  }

  callCountry(pagination: GetListRequest) {
    this.countryService.getAllCountry(pagination).subscribe((res: any) => {
      this.respondedList = res.content.records;
      this.length = res.content.totalRecords;
    });
  }

  onKeyUp(searchText: string) {
    console.log(searchText);
    this.searchSubject.next(searchText);
  }

  getSearchedCountry(searchText: string) {
    this.countryListRequest.searchQuery = searchText;
    this.callCountry(this.countryListRequest);
  }

  viewCountryDetails(item: any) {
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: {
        modalTitle: 'Country Details',
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
        this.router.navigate(['/admin/country/editcountry/' + item.id]);
      } else if (result == false) {
        this.deleteCountry(item);
      }
    });
  }

  deleteCountry(item: any) {
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
        this.countryService.deleteCountry(item.id).subscribe((res: any) => {
          this.respondedList = this.respondedList.filter(
            (x: any) => x.id != item.id
          );
        });
      }
    });
  }

  sortCountryDetails(event: any) {
    console.log(event);
    if (event.column !== 'Action') {
      this.countryListRequest.sortColumn = event.column;
      this.countryListRequest.sortOrder = event.direction;
      console.log(event.column + '  ' + event.direction);
      this.callCountry(this.countryListRequest);
    }
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  clickOnAddCountryButton() {
    this.router.navigate(['/admin/country/addcountry']);
  }

  clickOnEditCountryButton(item: any) {
    this.router.navigate(['/admin/country/editcountry/' + item.id]);
  }
}
