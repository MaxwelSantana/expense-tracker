import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TransactionsSummaryComponent } from './transactions-summary.component';
import { Transaction } from 'src/app/models/transaction';
import { RestDataSource } from 'src/app/services/rest.datasource';
import { of } from 'rxjs';

describe('TransactionsSummaryComponent', () => {
  let component: TransactionsSummaryComponent;
  let fixture: ComponentFixture<TransactionsSummaryComponent>;
  let mockDataSource: Partial<RestDataSource>;

  beforeEach(async () => {
    mockDataSource = {
      getTransactions: () => of([

      ])
    };

    await TestBed.configureTestingModule({
      declarations: [TransactionsSummaryComponent],
      providers: [{ provide: RestDataSource, useValue: mockDataSource }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test calculateSubtotal method
  it('should calculate subtotal correctly', () => {
    const transaction: Transaction = {
      quantity: 5, amount: 10,
      _id: '',
      category: 'Transportation',
      subcategory: 'TTC',
      description: 'Student Monthly Pass',
      status: 'Payment',
      date: new Date(2023, 9, 30),
      clearForm: function (): void {
        throw new Error('Function not implemented.');
      }
    };
    const subtotal = component.calculateSubtotal(transaction);
    expect(subtotal).toEqual(50);
  });

  // Test sumIncome method
  it('should calculate sum of income correctly', () => {
    const mockTransactions: Transaction[] = [

      {
        quantity: 2, amount: 20,
        _id: '',
        category: 'Transportation',
        subcategory: 'TTC',
        description: 'Student Monthly Pass',
        status: 'Received',
        date: new Date(2023, 9, 30),
        clearForm: function (): void {
          throw new Error('Function not implemented.');
        }
      },


      {
        quantity: 3, amount: 15,
        _id: '',
        category: 'Transportation',
        subcategory: 'TTC',
        description: 'Student Monthly Pass',
        status: 'Payment',
        date: new Date(2023, 9, 30),
        clearForm: function (): void {
          throw new Error('Function not implemented.');
        }
      }
    ];

    const sumIncome = component.sumIncome(mockTransactions);
    expect(sumIncome).toEqual(40);
  });

  // Test sumPayment method
  it('should calculate sum of payment correctly', () => {
    const mockTransactions: Transaction[] = [

      {
        quantity: 2, amount: 20,
        _id: '',
        category: 'Transportation',
        subcategory: 'TTC',
        description: 'Student Monthly Pass',
        status: 'Received',
        date: new Date(2023, 9, 30),
        clearForm: function (): void {
          throw new Error('Function not implemented.');
        }
      },


      {
        quantity: 3, amount: 15,
        _id: '',
        category: 'Transportation',
        subcategory: 'TTC',
        description: 'Student Monthly Pass',
        status: 'Payment',
        date: new Date(2023, 9, 30),
        clearForm: function (): void {
          throw new Error('Function not implemented.');
        }
      }
    ];

    const sumPayment = component.sumPayment(mockTransactions);
    expect(sumPayment).toEqual(45);
  });

  // Test myBalance method
  it('should calculate balance correctly', () => {
        const mockTransactions: Transaction[] = [

      {
        quantity: 2, amount: 20,
        _id: '',
        category: 'Transportation',
        subcategory: 'TTC',
        description: 'Student Monthly Pass',
        status: 'Received',
        date: new Date(2023, 9, 30),
        clearForm: function (): void {
          throw new Error('Function not implemented.');
        }
      },


      {
        quantity: 3, amount: 15,
        _id: '',
        category: 'Transportation',
        subcategory: 'TTC',
        description: 'Student Monthly Pass',
        status: 'Payment',
        date: new Date(2023, 9, 30),
        clearForm: function (): void {
          throw new Error('Function not implemented.');
        }
      }
    ];

    const balance = component.myBalance(mockTransactions);
    expect(balance).toEqual(-5);
  });
});
