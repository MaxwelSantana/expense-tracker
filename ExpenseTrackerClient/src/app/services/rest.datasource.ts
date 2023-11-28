import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Transaction } from '../models/transaction';
import { User } from './user.model';
import { Categories } from '../models/categories';

const PROTOCOL = 'http';
const PORT = 3000;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token!: string;
  authToken: string = '';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    }),
  };

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/api/`;
    } else {
      this.baseUrl = `/api/`;
    }
  }
  authenticate(email: string, pass: string): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + 'auth/login', {
        email: email,
        password: pass,
      })
      .pipe(
        map((response) => {
          console.log('authenticate', { response });
          return response;
        })
      );
  }
  signup(
    displayName: string | null,
    email: string | null,
    password: string | null

  ): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + 'auth/register', {
        displayName,
        email,
        password
      })
      .pipe(
        map((response) => {
          console.log('auth/register', { response });
          return response;
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

    return this.http
      .post<any>(
        this.baseUrl + 'myaccount/changePassword',
        { currentPassword, newPassword, newPassword2 },
        this.httpOptions
      )
      .pipe(
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
    return this.http.delete<any>(
      this.baseUrl + 'myaccount/deleteMyAccount',
      this.httpOptions
    );
  }

  logout(): Observable<any> {
    this.authToken = null!;
    localStorage.clear();
    console.log('working from datasource');
    return this.http.get<any>(
      this.baseUrl + 'myaccount/logout',
      this.httpOptions
    );
  }

  storeUserData(token: any): void {
    console.log('StoreUserData: ' + token);
    localStorage.setItem('id_token', 'Bearer ' + token);
  }

  loadToken(): void {
    const token = localStorage.getItem('id_token');
    console.log('loadToken: ' + token);
    this.authToken = token ? `${token}` : ''; // Include the "Bearer " prefix if the token exists
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.authToken
    );
  }

  get(path: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + path, this.httpOptions);
  }

  post(path: string, data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + path, data, this.httpOptions);
  }

  put(path: string, data: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + path, data, this.httpOptions);
  }

  /**********************TRANSACTIONS**************************/

  addTransaction(newTransaction: Transaction): Observable<Transaction>
  {
    this.loadToken();
    return this.http.post<Transaction>(this.baseUrl + 'transactions/newTransaction', newTransaction, this.httpOptions); // Perform POST request to add a new transaction
  }

  getTransactions(): Observable<Transaction[]>
  {
    this.loadToken();
    return this.http.get<Transaction[]>(this.baseUrl + 'transactions/getTransactions', this.httpOptions); // Perform GET request to add a new transaction
  }

  deleteTransaction(transactionId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'transactions/deleteTransaction/' + transactionId, this.httpOptions);
  }

  editTransaction(transactionId: string, updatedTransaction: Transaction): Observable<any> {
    this.loadToken();
    const url = `${this.baseUrl}transactions/editTransaction/${transactionId}`;
    return this.http.patch<any>(url, updatedTransaction , this.httpOptions);
  }


  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.baseUrl + 'transactions/getCategories', this.httpOptions);
  }
}



