import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MaterialUiModule } from 'src/app/material-ui/material-ui.module';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { CarouselComponent } from './carousel/carousel.component';


const components = [
  TableComponent,
  ButtonComponent,
  InputComponent,
  DialogBoxComponent,
  DropDownComponent,
  CarouselComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, MaterialUiModule, FormsModule, ReactiveFormsModule],
  exports: [...components, MaterialUiModule],
})
export class SharedModule {}
