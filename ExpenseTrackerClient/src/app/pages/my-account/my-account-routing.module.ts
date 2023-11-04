import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { CPasswordComponent } from './c-password/c-password.component';

const routes: Routes = [{
  path: '', component: SettingsComponent,
  children:[{path: 'cPassword', component: CPasswordComponent
}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
