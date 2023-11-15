import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(
      'canActivate',
      'this.auth.authenticated: ',
      this.auth.authenticated
    );
    if (!this.auth.authenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
