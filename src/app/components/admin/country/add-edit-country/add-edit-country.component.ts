import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Country } from 'src/app/models/country.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DropdownItem } from 'src/app/models/drop-down-item';
import { RouteConstatnt } from 'src/app/constants/route.constant';
import { MessageConstant } from 'src/app/constants/message.constant';

@Component({
  selector: 'app-add-edit-country',
  templateUrl: './add-edit-country.component.html',
  styleUrls: ['./add-edit-country.component.scss'],
})
export class AddEditCountryComponent implements OnInit {
  name: FormControl = new FormControl();
  addEditForm: FormGroup = new FormGroup({});
  countryId: any;
  countryData: Country = {
    name: '',
    status: 1,
  };
  //below field is for common deropdown
  addEditCountryLabel: string = 'Dropdown';
  addEditCountryPlaceholder: string = 'Select Country';
  addEditCountryRequired: boolean = true;
  addEditCountryDisabled: boolean = false;
  addEditCountryOptionsItem: DropdownItem[] = [
    { value: '2', viewValue: 'In-active' },
    { value: '1', viewValue: 'Active' },
    { value: '10', viewValue: 'Deleted' },
  ];
  dropdownSelectedValue: string = '';
  //below field is for common button
  addEditButtonLabel: string = 'Add Country';
  addEditButtonLabelForCancel: string = 'Cancel';
  disabledAddEditButton: boolean = false;
  addEditButtonStyle = {
    color: 'black',
    backgroundColor: 'rgb(79, 101, 226)',
    width: '130px',
    marginRight: '15px',
    marginLeft: '20px',
  };
  addEditButtonStyleForCancel = {
    color: 'black',
    width: '80px',
    marginRight: '20px',
    marginLeft: '20px',
  };
  cancelButtonClass = {
    btnClass: true,
  };
  // below field is for common input field
  countryLabel: string = 'Country';
  countryType: string = 'text';
  countryPlaceholder: string = 'Enter Country';
  countryRequired: boolean = true;
  countryStyles = {
    color: 'black',
    padding: '15px',
    border: '1px solid black',
  };
  countryValue: string = 'India';
  constructor(
    private _formBuilder: FormBuilder,
    private routes: ActivatedRoute,
    private countryService: CountryService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();

    this.countryId = this.routes.snapshot.paramMap.get('id');
    if (this.countryId != null) {
      this.addEditButtonLabel = MessageConstant.editCountryButtonLabel;
      this.countryService
        .viewCountryDetail(this.countryId)
        .subscribe((arg: any) => {
          this.dropdownSelectedValue = arg.content.status.toString();
          this.addEditForm.patchValue(arg.content);
        });
    }
  }

  createForm() {
    this.name = new FormControl('', [Validators.required]);
    this.addEditForm = this._formBuilder.group({
      name: this.name,
    });
  }
  // get checkValidation() {
  //   return this.addEditForm.controls;
  // }

  AddOrEdit() {
    this.addEditForm.markAllAsTouched;
    //console.log(this.addEditForm);
    if (this.addEditForm.valid) {
      this.countryData.name = this.addEditForm.controls['name'].value;
      if (this.countryId == null) {
        this.addCountryRecord();
      } else {
        this.editCountryRecord();
      }
    }
  }

  addCountryRecord() {
    this.countryService.addCountry(this.countryData).subscribe(
      (arg: any) => {
        if (arg != null) {
          this.snackbarService.show(MessageConstant.messageAfterCountryAdded);
          this.router.navigate([RouteConstatnt.countryPath]);
        }
      },
      (err: any) => {
        console.log(err.error.Messages[0]);
        this.snackbarService.show(err.error.Messages[0]);
      }
    );
  }

  editCountryRecord() {
    this.countryService
      .editCountryDetail(this.countryData, this.countryId)
      .subscribe(
        (arg: any) => {
          if (arg != null) {
            this.router.navigate([RouteConstatnt.countryPath]);
            this.snackbarService.show(
              MessageConstant.messageAfterCountryEdited
            );
          }
        },
        (err: any) => {
          this.snackbarService.show(err.error.Messages[0]);
        }
      );
  }

  selectedStatusValue(selectedValue: any) {
    this.countryData.status = parseInt(selectedValue);
  }

  clickedOnCancelButton() {
    this.router.navigate([RouteConstatnt.countryPath]);
  }
}
