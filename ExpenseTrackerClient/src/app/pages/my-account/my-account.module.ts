import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule
  ]
})
export class MyAccountModule { }
