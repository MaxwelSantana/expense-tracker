import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-c-password',
  templateUrl: './c-password.component.html',
  styleUrls: ['./c-password.component.scss']
})
export class CPasswordComponent {
  
  errorMessage:string = "Form Data Invalid"
  form = new FormGroup({
    currentPassword: new FormControl('',[Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    newPassword2: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private router: Router, private settings: SettingsService) {}

  cPassword() {
    console.log('form submit');
    if (this.form.valid) {
      const { currentPassword, newPassword, newPassword2 } = this.f;
          
      if (        
        currentPassword.value !== null &&
        newPassword.value !== null &&
        newPassword2.value !== null
      ) {           
        this.settings
          .cPassword(            
            currentPassword.value,
            newPassword.value,
            newPassword2.value
          )
          .subscribe((response) => {
            console.log(response);
            if (response) {
              this.router.navigateByUrl('/dashboard');
            }
            console.log(response);
          });
      } else {
        this.errorMessage = 'Form Data Invalid';
      }
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }
  
}
