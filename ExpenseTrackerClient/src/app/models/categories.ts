export class Categories {
  _id!: string;
  categoryGroupId!: string;
  name: string;
  target: {
    targetType: string,
    amount: number;
    frequency: {      
          type: String,
          enum: ['Weekly', 'Monthly', 'Yearly']   
    }
  };
}
