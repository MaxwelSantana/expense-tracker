export class Transaction{
  id!: number;
  category: string | undefined;
  subcategory: string | undefined;
  quantity!: number;
  amount!:number;
  description: string | undefined;
  status!:string;
  dateCreated!:Date;
}
