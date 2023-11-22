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

  addTransaction(newTransaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, newTransaction); // Perform POST request to add a new transaction
  }

  editTransaction(updatedTransaction: Transaction): Observable<Transaction> {
    const url = `${this.apiUrl}/${updatedTransaction.id}`;
    return this.http.post<Transaction>(url, updatedTransaction); // Perform POST request to update a transaction by ID
  }

  deleteTransaction(transactionId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${transactionId}`);
  }
}

