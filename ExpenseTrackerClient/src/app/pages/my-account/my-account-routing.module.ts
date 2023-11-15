import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { CPasswordComponent } from './c-password/c-password.component';

const myAccountRoutes: Routes = [{
  path: '',
  children:[
    {
      path: 'cPassword',
      component: CPasswordComponent
    },
    {
      path: 'settings',
      component:SettingsComponent
    }
    ]}];

@NgModule({
  imports: [RouterModule.forChild(myAccountRoutes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
