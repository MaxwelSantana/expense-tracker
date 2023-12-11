import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BudgetRepository } from 'src/app/repository/budget.repository';
import { BudgetComponent } from '../budget.component';
import { BudgetSummaryComponent } from './budget-summary.component';
import { Categories } from 'src/app/models/categories';
import { Observable } from 'rxjs';



describe('BudgetSummaryComponent', () => {
  let component: BudgetSummaryComponent;
  let fixture: ComponentFixture<BudgetSummaryComponent>;
  let mockBudgetRepository: Partial<BudgetRepository>;
  let mockBudgetComponent: Partial<BudgetComponent>;


  beforeEach(async () => {
    // Mock ActivatedRoute
    const mockActivatedRoute = {
      snapshot: { params: { key: 'some_key' } }
    };

    mockBudgetRepository = {
      getBudget: (key: string) => {
        return new Observable((observer) => {
            observer.next();
            observer.complete();
        })
        // Implement mock behavior for getBudget method if needed for testing
      },
      getBudgetEntries: () => {
        // Return mocked budget entries data for testing getcalculateEntries method
        return {
          entry1: { assigned: 100 },
          entry2: { assigned: 150 },
          // Add more mocked entries if needed for testing variations
        };
      },
      categories: [
        // Mocked categories data if needed for testing getcalculateTarget method
        { /* category object */ },
        { /* another category object */ },
        // Add more mocked categories as needed
      ] as Categories[]
    };

    mockBudgetComponent = {
      getAmountAvailable: (category: Categories) => {
        // Implement mock behavior for getAmountAvailable method if needed for testing getcalculateTarget
        return 50; // Mocked available amount
      }
    };

    await TestBed.configureTestingModule({
      declarations: [BudgetSummaryComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide mock ActivatedRoute
        { provide: BudgetRepository, useValue: mockBudgetRepository },
        { provide: BudgetComponent, useValue: mockBudgetComponent }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total entries correctly', () => {
    const totalEntries = component.getcalculateEntries();
    // Modify the expectation based on your calculation logic
    expect(totalEntries).toEqual(250); // Expected sum of assigned values from mocked entries
  });

  it('should calculate total target correctly', () => {
    const totalTarget = component.getcalculateTarget();
    // Modify the expectation based on your calculation logic
    expect(totalTarget).toEqual(100); // Expected total available amount from mocked categories
  });
});
