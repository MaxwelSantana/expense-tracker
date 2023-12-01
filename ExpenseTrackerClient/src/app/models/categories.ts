export class Categories {
  _id!: string;
  categoryGroupId!: string;
  name: string;
  target:{
    type:string
    amount:number;
    frequency: String[]    
  }  
}
