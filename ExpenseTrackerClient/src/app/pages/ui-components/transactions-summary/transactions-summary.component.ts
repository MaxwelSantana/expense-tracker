import { Component } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { RestDataSource } from 'src/app/services/rest.datasource';

@Component({
  selector: 'app-transactions-summary',
  templateUrl: './transactions-summary.component.html',
  styleUrls: ['./transactions-summary.component.scss']
})
export class TransactionsSummaryComponent {

  transactions ?: Transaction[] | null ;

  constructor(private dataSource: RestDataSource) {
    this.dataSource.getTransactions().subscribe(t=> {
    this.transactions = t;
    console.log(this.transactions);
    })
  }

  calculateSubtotal(transaction: Transaction): number {
    return transaction.quantity * transaction.amount;
  }

  sumIncome(transactions: Transaction[]): number {
    let sumIncome = 0;

      for(let i =0; i<transactions.length; i++){
        if(transactions[i].status === "Received"){
          sumIncome = sumIncome + this.calculateSubtotal(transactions[i])
      }
      }
    return sumIncome;
  }

  sumPayment(transactions: Transaction[]): number {
    let sumPayment = 0;

      for(let i =0; i<transactions.length; i++){
        if(transactions[i].status === "Payment"){
          sumPayment = sumPayment + this.calculateSubtotal(transactions[i])
      }
      }
    return sumPayment;
  }

  myBalance(transactions: Transaction[]): number {
    let balance = 0;

    balance = this.sumIncome(transactions) - this.sumPayment(transactions) ;
    return balance;
  }

}
