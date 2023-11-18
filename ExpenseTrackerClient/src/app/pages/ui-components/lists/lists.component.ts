import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction';
import { Observable } from 'rxjs';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class AppListsComponent implements OnInit{
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

  onAddTransaction() {
    if (this.isFormComplete()) {
      const newTransaction: Transaction = new Transaction(); // Create a new instance of Transaction class

      // Assign values to the properties of the newTransaction object
      newTransaction.id = new Date().getTime(); // Generate an ID
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
