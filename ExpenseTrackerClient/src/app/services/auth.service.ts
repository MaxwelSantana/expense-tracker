import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';
import { User } from './user.model';
import { Transaction } from '../models/transaction';

@Injectable()
export class AuthService {
  constructor(private datasource: RestDataSource) {}

  authenticate(email: string, password: string): Observable<any> {
    return this.datasource.authenticate(email, password);
  }

  signup(
    displayName: string | null,
    email: string | null,
    password: string | null    
  ): Observable<any> {
    return this.datasource.signup(displayName, email, password);
  }

  get authenticated(): boolean {
    this.datasource.loadToken();
    console.log(this.datasource.authToken);
    return !!this.datasource.authToken;
  }

logout(): Observable<any>
    {
        return this.datasource.logout();
    }

  storeUserData(token:any, user: String[]){
    this.datasource.storeUserData(token, user);
  }
}
