import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { BudgetComponent } from './budget/budget.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'budget',
    redirectTo: `/budget/${getCurrentMonthKey()}`,
    pathMatch: 'full',
  },
  {
    path: 'budget/:key',
    component: BudgetComponent,
  },
];

function getCurrentMonthKey() {
  return '202311';
}
