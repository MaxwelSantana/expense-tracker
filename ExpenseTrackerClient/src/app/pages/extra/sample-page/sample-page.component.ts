import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.css']
})
export class AppSamplePageComponent implements OnInit {

  enteredCateg='';
  enteredSubcat='';
  enteredQty='';
  enteredAmount='';
  enteredDesc='';
  enteredStatus='';
  enteredDate='';

  showError: boolean = false;

  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onAddTransaction() {
    if (this.isFormComplete()) {
      const newTransaction: Transaction = new Transaction(); // Create a new instance of Transaction class

      // Assign values to the properties of the newTransaction object
      newTransaction.id = new Date().getTime().toString();; // Generate an ID
      newTransaction.category = this.enteredCateg;
      newTransaction.subcategory = this.enteredSubcat;
      newTransaction.quantity = +this.enteredQty;
      newTransaction.amount = +this.enteredAmount;
      newTransaction.description = this.enteredDesc;
      newTransaction.status = this.enteredStatus;
      newTransaction.dateCreated = new Date(this.enteredDate);


      this.transactionService.addTransaction(newTransaction).subscribe(
        (response) => {
          // If the addition was successful, update the local list
          this.transactions.push(response);
          this.clearForm();
        },
        (error) => {
          console.error('Error adding transaction:', error);
        }
      );
    } else {
      console.log('Please complete all fields.');
      this.showError = true;
    }
  }

  clearForm() {
    this.enteredCateg = '';
    this.enteredSubcat = '';
    this.enteredQty='';
    this.enteredAmount = '';
    this.enteredDesc = '';
    this.enteredStatus = '';
    this.enteredDate = '';

  }

  isFormComplete(): boolean {
    return (
      !!this.enteredCateg &&
      !!this.enteredSubcat &&
      !!this.enteredQty &&
      !!this.enteredAmount &&
      !!this.enteredDesc &&
      !!this.enteredStatus &&
      !!this.enteredDate
    );
  }


  hideErrorMessage() {
    this.showError = false;
  }
}

