import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories } from 'src/app/models/categories';
import { BudgetRepository } from 'src/app/repository/budget.repository';
import { BudgetComponent } from '../budget.component';
import { CategoryGroup } from 'src/app/models/category-groups';
import { BudgetEntries } from 'src/app/models/budget-entries';

@Component({
  selector: 'app-budget-summary',
  templateUrl: './budget-summary.component.html',
  styleUrls: ['./budget-summary.component.scss'],
})
export class BudgetSummaryComponent {
  budget?: Categories[] | null;
  entries: BudgetEntries;

  constructor(
    private budgetRepository: BudgetRepository,
    private activeRoute: ActivatedRoute,
    private budgetComponent: BudgetComponent
  ) {
    const key = this.activeRoute.snapshot.params['key'];
    this.budgetRepository.getBudget(key);
  }

  get categoriesDataSource(): Array<any> {
    const flattenList: any = [];
    this.budgetRepository.categoryGroups?.forEach((categoryGroup) => {
      flattenList.push({ ...categoryGroup, isGroup: true });
      flattenList.push(...categoryGroup.categories);
    });
    return flattenList;
  }

  private cachedEntries: number | undefined;
  private cachedTarget: number | undefined;

  getcalculateEntries(): number {
    const entriesArray = Object.values(
      this.budgetRepository.getBudgetEntries()
    );
    let sumAssigned = 0;

    entriesArray.forEach((element: any) => {
      // Use 'any' type here as the structure is not completely specified
      sumAssigned += element.assigned;
    });
    return sumAssigned;
  }

  getcalculateTarget(): number {
    let availableAmount = 0;
    this.budgetRepository.categories?.forEach((element: Categories) => {
      availableAmount += this.budgetComponent.getAmountAvailable(element);
    });
    return availableAmount;
  }
}
