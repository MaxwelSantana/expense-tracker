import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { User } from './user.model';

const PROTOCOL = 'http';
const PORT = 3000;


@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token!: string;
  user ?: User;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/api/`;
    //this.baseUrl = `/api/`;
  }
  authenticate(email: string, pass: string): Observable<boolean> {
    return this.http
      .post<any>(this.baseUrl + 'auth/login', {
        email: email,
        password: pass,
      })
      .pipe(
        map((response) => {
          console.log('authenticate', { response });
          this.auth_token = response.success ? response.token : null;
          return response.success;
        })
      );
  }
  signup(
    displayName: string | null,
    email: string | null,
    password: string | null
  ): Observable<boolean> {
    return this.http
      .post<any>(this.baseUrl + 'auth/register', {
        displayName,
        email,
        password,
      })
      .pipe(
        map((response) => {
          console.log('auth/register', { response });
          this.auth_token = response.success ? response.token : null;
          return response.success;
        })
      );
  }

  changePassword(    
    currentPassword: string | null,
    newPassword: string | null,
    newPassword2: string | null
  ): Observable<boolean> {
    return this.http
      .post<any>(this.baseUrl + 'myaccount/changePassword', {        
        currentPassword,
        newPassword,
        newPassword2,
      })
      .pipe(
        map((response) => {
          console.log('myaccount/changePassword', { response });
          this.auth_token = response.success ? response.token : null;
          return response.success;
        }),
        catchError((error: HttpErrorResponse) => {
          // Log error details here
          console.error('Change Password Error:', error);
          // Rethrow the error or return a default value
          return throwError('Change Password failed');
        })
      );;
  }

  storeUserData(token:any, user:User): void
    {
        this.user = user
        localStorage.setItem('id_token', 'Bearer ' + token);
        localStorage.setItem('user', JSON.stringify(user));             
    }


  private getOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth_token}`,
      }),
    };
  }
}
