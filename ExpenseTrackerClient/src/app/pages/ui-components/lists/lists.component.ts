import { Component, EventEmitter, Output } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class AppListsComponent {
  enteredCateg = '';
  enteredSubcat = '';
  enteredQty = '';
  enteredAmount = '';
  enteredDesc = '';
  enteredStatus = '';
  enteredDate = '';
  // newTransaction='No Content Yet.';

  // @Output() postCreated = new EventEmitter();

  showError: boolean = false;

  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService){
    this.transactions = transactionService.getAll();
  }

  onAddTransaction() {
    if (this.isFormComplete()) {
      const newTransaction: Transaction = {
        id: new Date().getTime(),
        category: this.enteredCateg,
        subcategory: this.enteredSubcat,
        quantity: +this.enteredQty,
        amount: +this.enteredAmount,
        description: this.enteredDesc,
        status: this.enteredStatus,
        dateCreated: new Date(this.enteredDate)
      };

      this.transactions.push(newTransaction);
      this.clearForm();
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




  typesOfShoes: string[] = ['Loafers', 'Sneakers'];

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];
}
