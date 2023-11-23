import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class AppListsComponent implements OnInit{

 transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}


  ngOnInit() {
    this.fetchTransactions(); // Fetch transactions on component initialization
  }

  fetchTransactions() {
    this.transactionService.getAll().subscribe(
      (data: Transaction[]) => {
        this.transactions = data; // Assign the retrieved data to this.transactions
      },
      (error) => {
        console.error(error); // Handle any errors
      }
    );
  }

  onDeleteTransaction(transactionId: string) {
    this.transactionService.deleteTransaction(transactionId).subscribe(
      (response) => {
        console.log('Transaction deleted:', response);
        // Optionally, update your UI or perform other actions after successful deletion
      },
      (error) => {
        console.error('Error deleting transaction:', error);
        // Handle errors appropriately
      }
    );
  }
}
