import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEditCountryComponent } from './country/add-edit-country/add-edit-country.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditCityComponent } from './city/add-edit-city/add-edit-city.component';
import { SkillComponent } from './skill/skill.component';
import { AddEditSkillComponent } from './skill/add-edit-skill/add-edit-skill.component';

const components = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  AdminComponent,
  CityComponent,
  CountryComponent,
  AddEditCountryComponent,
  AddEditCityComponent,
  SkillComponent,
  AddEditSkillComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...components],
})
export class AdminModule {}
