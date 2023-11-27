import { Injectable } from '@angular/core';
import { Budget } from '../models/budget';
import { RestDataSource } from '../services/rest.datasource';
import { Categories } from '../models/categories';
import { CategoryGroup } from '../models/category-groups';
import { BudgetEntries } from '../models/budget-entries';

@Injectable()
export class BudgetRepository {
  private budget: Budget;
  private budgetEntriesByCategoryId: any = {};

  constructor(private dataSource: RestDataSource) {}

  getBudget(key: string) {
    this.dataSource.get(`budget/${key}`).subscribe((data) => {
      this.budget = data;
      this.budget.budgetEntries.forEach((entry) => {
        this.updateBudgetEntriesMap(entry);
      });
      console.log(this.budget);
    });
  }

  updateBudgetEntriesMap(entry: BudgetEntries) {
    this.budgetEntriesByCategoryId[entry.categoryId] = entry;
  }

  createBudgetEntry(entry: BudgetEntries) {
    return this.dataSource.post('budget/entry', entry).subscribe((data) => {
      this.updateBudgetEntriesMap(data);
      console.log({ data });
    });
  }

  updateBudgetEntry(entry: BudgetEntries) {
    return this.dataSource
      .put(`budget/entry/${entry._id}`, entry)
      .subscribe((data) => {
        this.updateBudgetEntriesMap(data);
        console.log({ data });
      });
  }

  get budgetId(): string {
    return this.budget._id;
  }

  get categoryGroups(): Array<CategoryGroup> {
    return this.budget?.categoryGroups;
  }

  get categories(): Array<Categories> {
    return this.budget?.categories;
  }

  get budgetEntries(): any {
    return this.budgetEntriesByCategoryId;
  }
}
