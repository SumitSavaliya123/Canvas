import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { City } from 'src/app/models/city.model';
import { DropdownItem } from 'src/app/models/drop-down-item';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MessageConstant } from 'src/app/constants/message.constant';
import { RouteConstatnt } from 'src/app/constants/route.constant';

@Component({
  selector: 'app-add-edit-city',
  templateUrl: './add-edit-city.component.html',
  styleUrls: ['./add-edit-city.component.scss'],
})
export class AddEditCityComponent implements OnInit {
  name: FormControl = new FormControl();
  addEditCityForm: FormGroup = new FormGroup({});

  cityId: any;
  cityData: City = {
    name: '',
    status: 1,
    cityId: 1,
  };
  //below field is for common deropdown
  addEditCityLabel: string = 'Dropdown';
  addEditCityPlaceholder: string = 'Select Country';
  addEditCityRequired: boolean = true;
  addEditCityDisabled: boolean = false;
  addEditCityOptionsItem: DropdownItem[] = [
    { value: '2', viewValue: 'In-active' },
    { value: '1', viewValue: 'Active' },
  ];
  dropdownSelectedValue: string = '';
  //below field is for common button
  addEditButtonLabel: string = 'Add City';
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
  //below field is for common input field
  cityLabel: string = 'City';
  cityType: string = 'text';
  cityPlaceholder: string = 'Enter City';
  cityRequired: boolean = true;
  cityStyles = {
    color: 'black',
  };
  constructor(
    private routes: ActivatedRoute,
    private cityService: CityService,
    private snackbarService: SnackbarService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.name = new FormControl('', [Validators.required]);
    this.addEditCityForm = this.fb.group({
      name: this.name,
    });

    this.cityId = this.routes.snapshot.paramMap.get('id');
    if (this.cityId != null) {
      this.addEditButtonLabel = MessageConstant.editCityButtonLabel;
      this.cityService.viewCityDetail(this.cityId).subscribe((arg: any) => {
        this.dropdownSelectedValue = arg.content.status.toString();
        this.addEditCityForm.patchValue(arg.content);
      });
    }
  }

  AddOrEdit() {
    this.addEditCityForm.markAllAsTouched;
    if (this.addEditCityForm.valid) {
      this.cityData.name = this.addEditCityForm.controls['name'].value;
      if (this.cityId == null) {
        this.addCityRecord();
      } else {
        this.editCityRecord();
      }
    }
  }

  addCityRecord() {
    this.cityService.addCity(this.cityData).subscribe((arg: any) => {
      if (arg != null) {
        this.snackbarService.show(MessageConstant.messageAfterCityAdded);
        this.router.navigate([RouteConstatnt.cityPath]);
      }
    });
  }

  editCityRecord() {
    this.cityService
      .editCityDetail(this.cityData, this.cityId)
      .subscribe((arg: any) => {
        if (arg != null) {
          this.router.navigate([RouteConstatnt.cityPath]);
          this.snackbarService.show(MessageConstant.messageAfterCityEdited);
        }
      });
  }

  selectedStatusValue(event: any) {
    //console.log(event);
    this.cityData.status = parseInt(event);
  }

  clickedOnCancelButton() {
    this.router.navigate([RouteConstatnt.cityPath]);
  }
}
