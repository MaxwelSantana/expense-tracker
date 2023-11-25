import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction';
import { Observable } from 'rxjs';
import { RestDataSource } from 'src/app/services/rest.datasource';
import { User } from 'src/app/services/user.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class AppListsComponent implements OnInit{

 transactions ?: Transaction[] | null ;
 user ?: User;

 constructor(private dataSource: RestDataSource) {
    // const fetchedTransactions = this.fetchTransactions; // Call the method to execute it
    // console.log("Fetched Transactions: ", fetchedTransactions);
    this.dataSource.getTransactions().subscribe(t=> {
    this.transactions = t;
    console.log(this.transactions);
    })
}


  ngOnInit() {
    // this.transactions;

    //  this.fetchTransactions(); // Fetch transactions on component initialization
    //  console.log(this.transactions)
  }

  // get fetchTransactions(): Transaction[] {
  //   this.dataSource.getTransactions().subscribe(t =>{
  //     this.transactions = t.transactions;
  //     return this.transactions;
  //   })
    // const userTransactions = localStorage.getItem('user');
    // console.log("FetchTransactions: " + userTransactions);
    // if (typeof userTransactions === 'string') {
    //   const userObject = JSON.parse(userTransactions);
    //   this.user = userObject as User; 
    //   this.transactions = this.user.transactions
    //   return this.transactions || []; // Return the transaction or an empty array
    // }
    // return []; // Return an empty array in case the condition doesn't match
  //}
  


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
    console.log('Deleting transaction with ID:', transactionId);

    this.dataSource.deleteTransaction(transactionId).subscribe(
      
      (response) => {
        console.log('Transaction deleted:', response);
        // Optionally, update your UI or perform other actions after successful deletion
        window.location.reload(); // Reload the page
      },
      (error) => {
        console.error('Error deleting transaction:', error);
        // Handle errors appropriately
      }
    );
  }
}
