import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls:['./lists.component.css']
})
export class AppListsComponent {
  transactions: Transaction[] = [];

  constructor(private TransactionService: TransactionService){
    this.transactions = TransactionService.getAll();
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
