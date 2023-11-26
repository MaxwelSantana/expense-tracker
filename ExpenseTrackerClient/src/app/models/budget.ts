import { BudgetEntries } from './budget-entries';
import { Categories } from './categories';
import { CategoryGroup } from './category-groups';

export class Budget {
  _id!: string;
  categoryGroups: Array<CategoryGroup>;
  categories: Array<Categories>;
  budgetEntries: Array<BudgetEntries>;
}
