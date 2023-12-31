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

  authenticate(form: NgForm): void {
    if (form.valid) {
      this.auth
        .authenticate(this.email, this.password)
        .subscribe((response) => {
          if (response.success) {
            this.auth.storeUserData(response.token);
            this.router.navigateByUrl('/dashboard');
          }
          this.errorMessage = 'Authentication Failed. Please review your credentials and try again.';
        });
    } else {
      this.errorMessage =
        "We're sorry, but the form is incomplete. Please ensure all fields are filled out before proceeding";
    }
  }
}
