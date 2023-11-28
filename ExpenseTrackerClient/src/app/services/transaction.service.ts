import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient to perform HTTP requests
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/api/transactions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl); // Perform GET request to fetch all transactions
  }

  // editTransaction(transactionId: string, updatedTransaction: Transaction): Observable<any> {
  //   const url = `${this.apiUrl}/${transactionId}`;
  //   return this.http.patch<any>(url, updatedTransaction);
  // }

  deleteTransaction(transactionId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${transactionId}`);
  }


}

