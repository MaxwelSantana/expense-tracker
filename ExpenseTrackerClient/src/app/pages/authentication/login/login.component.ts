import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  public email: string = '';
  public password: string = '';
  public errorMessage: string = '';

  constructor(private router: Router, private auth: AuthService) {}

  goBack() {
    this.router.navigateByUrl('/');
  }

  authenticate(form: NgForm) {
    console.log('form submit');
    if (form.valid) {
      this.auth
        .authenticate(this.email, this.password)
        .subscribe((response) => {
          console.log(response);
          if (response) {
            this.router.navigateByUrl('/dashboard');
          }
          this.errorMessage = 'Authentication Failed';
        });
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }
}
