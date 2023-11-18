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

  deleteTransaction(id: number): Observable<number> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<number>(url); // Perform DELETE request to delete a transaction by ID
  }
}

