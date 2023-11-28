import {Transaction} from "./transaction";


export class ListTransactionsItem{
  constructor(public transaction: Transaction){}
  quantity: number =1;
  amount: number = this.transaction.amount;

}
