import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { sample_transactions } from 'src/data';


// @Injectable decorator. This decorator tells Angular that this class can be injected into other components or services.

@Injectable({
  providedIn: 'root',
})

//export the PostService class so that it can be imported and used in other parts of your application.

export class TransactionService {
  constructor(){}

    getAll(): Transaction[]{

      return sample_transactions;
 }

}
