import { Transaction } from "./app/models/transaction"

export const sample_transactions: Transaction[]=[
  {
    id:1,
    category: 'Transportation',
    subcategory: 'TTC',
    quantity: 1,
    amount: 128.30,
    description: 'Student Monthly Pass',
    status: 'Payment',
    dateCreated: new Date(2023, 9, 30),
  },
  {
    id:2,
    category: 'Groceries',
    subcategory: 'Cleaners',
    quantity: 1,
    amount: 1.25,
    description: 'Scrubbing Sponge',
    status: 'Payment',
    dateCreated: new Date(2023, 9, 29),
  },
  {
    id:3,
    category: 'Groceries',
    subcategory: 'Seasoning',
    quantity: 1,
    amount: 8.99,
    description:'Olive Oil',
    status: 'Payment',
    dateCreated: new Date(2023, 9, 29),
  },
  {
    id:4,
    category: 'Salary',
    subcategory: 'Company X',
    quantity: 1,
    amount: 450.0,
    description:'Weekly salary',
    status: 'Received',
    dateCreated: new Date(2023, 9, 31),
  }
]
