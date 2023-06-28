import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { AddEditCountryComponent } from './country/add-edit-country/add-edit-country.component';
import { AddEditCityComponent } from './city/add-edit-city/add-edit-city.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CountryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'country',
        children: [
          { path: '', component: CountryComponent, canActivate: [AuthGuard] },
          { path: 'addcountry', component: AddEditCountryComponent },
          { path: 'editcountry/:id', component: AddEditCountryComponent },
        ],
      },
      {
        path: 'city',
        component: CityComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'city',
        children: [
          { path: '', component: CityComponent },
          { path: 'addcity', component: AddEditCityComponent },
          { path: 'editcity/:id', component: AddEditCityComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
