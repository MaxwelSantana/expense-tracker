import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const PROTOCOL = 'http';
const PORT = 3000;


@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token!: string;
  authToken : string = '';
  private httpOptions = 
    {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        })
    };

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
          console.log(response.token);
          return response.success;
        })
      );
  }

  changePassword(
    currentPassword: string | null,
    newPassword: string | null,
    newPassword2: string | null
  ): Observable<boolean> {
    this.loadToken();
    console.log(this.authToken);
    if (!this.authToken) {
      return throwError('Authentication token missing');
    }
  
    return this.http.post<any>(
      this.baseUrl + 'myaccount/changePassword',
      { currentPassword, newPassword, newPassword2 },
      this.getOptions()
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Change Password Error:', error);
        return throwError('Change Password failed');
      })
    );
  }
  deleteMyAccount(): Observable<boolean> {
    this.loadToken();
    console.log(this.authToken);
    if (!this.authToken) {
      return throwError('Authentication token missing');
    }
      
    const options = this.getOptions();
  
    return this.http.delete<any>(this.baseUrl + 'myaccount/deleteMyAccount',options)
      
  } 

  storeUserData(token:any): void
    {              
        localStorage.setItem('id_token', token);              
    }

    private loadToken(): void {
      const token = localStorage.getItem('id_token');        
      this.authToken = token ? `${token}` : ''; // Include the "Bearer " prefix if the token exists
      this.httpOptions.headers = this.httpOptions.headers.set(
        'Authorization',
        this.authToken
      );
    }
    
  

  private getOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth_token}`,
      }),
    };
  }
}
