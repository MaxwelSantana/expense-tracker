

export class Transaction{
  _id: string;
  category: string | undefined;
  subcategory: string | undefined;
  quantity!: number ;
  amount!:number;
  description: string | undefined;
  status!:string;
  date!:Date;

  editable?: boolean;

  constructor(){};

  clearForm(): void {
    this._id = '';
    this.category = '';
    this.subcategory='';
    this.quantity = 0;
    this.amount = 0;
    this.status = '';
    this.date;
  }
}
