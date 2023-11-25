import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction';
import { Observable } from 'rxjs';
import { RestDataSource } from 'src/app/services/rest.datasource';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class AppListsComponent implements OnInit{

 transactions: Transaction[] = [];

  constructor(private dataSource: RestDataSource, private transactionService: TransactionService)
  {

  }


  ngOnInit() {
    // this.transactions;

     this.fetchTransactions(); // Fetch transactions on component initialization
     console.log(this.transactions)
  }

    fetchTransactions() {
      const userTransactions = localStorage.getItem('transactions');
      console.log(userTransactions);
      if(typeof userTransactions === 'string'){
        const transactionObject = JSON.parse(userTransactions);
        this.transactions = transactionObject;
      }
  }


  // fetchTransactions() {
  //   this.transactionService.getAll().subscribe(
  //     (data: Transaction[]) => {
  //       this.transactions = data; // Assign the retrieved data to this.transactions
  //     },
  //     (error) => {
  //       console.error(error); // Handle any errors
  //     }
  //   );
  // }

  onDeleteTransaction(transactionId: string) {
    // this.transactionService.deleteTransaction(transactionId).subscribe(
    //   (response) => {
    //     console.log('Transaction deleted:', response);
    //     // Optionally, update your UI or perform other actions after successful deletion
    //   },
    //   (error) => {
    //     console.error('Error deleting transaction:', error);
    //     // Handle errors appropriately
    //   }
    // );
  }
}
