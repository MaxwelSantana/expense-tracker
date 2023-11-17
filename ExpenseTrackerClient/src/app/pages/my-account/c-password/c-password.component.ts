import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';
import { User } from 'src/app/services/user.model';

@Component({
  selector: 'app-c-password',
  templateUrl: './c-password.component.html',
  styleUrls: ['./c-password.component.scss']
})
export class CPasswordComponent {
  
  errorMessage:string = "Form Data Invalid"
  userJ ?: User;
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
      const user = localStorage.getItem('user');      
      if (
        user !== null &&
        currentPassword.value !== null &&
        newPassword.value !== null &&
        newPassword2.value !== null
      ) {
        this.userJ = JSON.parse(user) as User; 
        console.log(this.userJ);       
        this.settings
          .cPassword(
            this.userJ,
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
