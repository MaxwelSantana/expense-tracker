import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class AuthService {
  constructor(private datasource: RestDataSource) {}
  authenticate(email: string, password: string): Observable<boolean> {
    return this.datasource.authenticate(email, password);
  }
  signup(
    displayName: string | null,
    email: string | null,
    password: string | null
  ): Observable<boolean> {
    return this.datasource.signup(displayName, email, password);
  }
  get authenticated(): boolean {
    return !!this.datasource.auth_token;
  }
  clear() {
    this.datasource.auth_token = '';
  }
}
