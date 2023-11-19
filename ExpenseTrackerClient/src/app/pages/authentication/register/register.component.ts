import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  constructor(private router: Router, private auth: AuthService) {}

  public errorMessage: string = '';

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
          console.log(response);
          if (response.success) {
            this.auth.storeUserData(response.token)
            this.router.navigateByUrl('/dashboard');
          }
          this.errorMessage = 'User Registration Failed';
        });
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }
}
