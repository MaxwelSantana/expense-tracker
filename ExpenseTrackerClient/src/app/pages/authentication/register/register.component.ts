import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  constructor(private router: Router, private auth: AuthService) {}

  public errorMessage: string = '';

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form, this.form.valid);
    if (this.form.valid) {
      const { uname, email, password } = this.f;
      this.auth
        .signup(uname.value, email.value, password.value)
        .subscribe((response) => {
          if (response.success && !response.error) {
            this.auth.storeUserData(response.token);
            this.router.navigateByUrl('/dashboard');
          }
          this.errorMessage = response.error.message;
        });
    } else {
      this.errorMessage =
        "We're sorry, but the form is incomplete. Please ensure all fields are filled out before proceeding";
    }
  }
}
