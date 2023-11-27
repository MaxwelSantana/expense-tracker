import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Transaction } from '../models/transaction';
import { User } from './user.model';

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

    return this.http.post<any>(
      this.baseUrl + 'myaccount/changePassword',
      { currentPassword, newPassword, newPassword2 },
      this.httpOptions
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

    return this.http.delete<any>(this.baseUrl + 'myaccount/deleteMyAccount',this.httpOptions)

  }

  logout(): Observable<any>
    {
      this.authToken = null!;
      localStorage.clear();
      console.log("working from datasource");
      return this.http.get<any>(this.baseUrl + 'myaccount/logout',this.httpOptions)
    }

  storeUserData(token:any, user: String[]): void
    {
        console.log("StoreUserData: "+ token);
        localStorage.setItem('id_token', 'Bearer ' + token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('localStorage', user)
    }

    loadToken(): void {
      const token = localStorage.getItem('id_token');
      //const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTU2ZjlmOTdlY2I1MjZmMGE1MDczZSIsImRpc3BsYXlOYW1lIjoiTGVvbmFyZG8iLCJlbWFpbCI6Imxlb0B0ZXN0LmNhIiwiaWF0IjoxNzAwMjY5NDAzLCJleHAiOjE3MDA4NzQyMDN9.ddDGsam7hjpysxyObln6xytT2fNeAkMM9B5ylohwMn0';
      console.log("loadToken: "+ token);
      this.authToken = token ? `${token}` : ''; // Include the "Bearer " prefix if the token exists
      this.httpOptions.headers = this.httpOptions.headers.set(
        'Authorization', this.authToken );
    }



  private getOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth_token}`,
      }),
    };
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
    const url = `${this.baseUrl}transactions/editTransaction/${transactionId}`;
    return this.http.patch<any>(url, updatedTransaction);
  }
}



