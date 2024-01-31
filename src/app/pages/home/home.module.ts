import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HomeRoutingModule } from "./home-routing.module";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbInputModule,
  NbAutocompleteModule,
  NbFormFieldModule,
  NbTagModule,
} from "@nebular/theme";
import { HomeComponent } from "./home.component";
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { RegistrationPopupComponent } from './registration-popup/registration-popup.component';

@NgModule({
  declarations: [HomeComponent, BasicInfoComponent, RegistrationPopupComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbTagModule,
    NbIconModule,
    NbInputModule,
    NbAutocompleteModule
  ],
})
export class HomeModule {}
