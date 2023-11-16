import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyAccountRoutingModule } from './my-account-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { CPasswordComponent } from './c-password/c-password.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SettingsComponent,
    CPasswordComponent
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    ReactiveFormsModule  
  ]
})
export class MyAccountModule { 
  

}
