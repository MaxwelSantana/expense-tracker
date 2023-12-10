import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction';
import { RestDataSource } from 'src/app/services/rest.datasource';
import { Router } from '@angular/router';
import { Categories } from 'src/app/models/categories';
import { CategoryGroup } from 'src/app/models/category-groups';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.css'],
})
export class AppSamplePageComponent {
  newTransaction: Transaction = new Transaction(); // Create a new instance of Transaction class

  categories?: any[];
  subCategories?: Categories[];

  constructor(private restDataSource: RestDataSource, private router: Router) {
    this.restDataSource.getCategoryGroups().subscribe((c) => {
      this.categories = [
        ...c,
        { name: 'Salary', categories: [{ name: 'Salary' }] },
      ];
    });
  }

  onChangeCategory(categoryName: any) {
    const cat = this.categories?.find((c) => c.name == categoryName);
    this.subCategories = cat?.categories ? cat?.categories : [];
  }

  onAddTransaction(form: NgForm) {
    if (!this.newTransaction?.category) {
      window.alert('Choose a category');
    }

    if (!this.newTransaction?.subcategory) {
      window.alert('Choose a sub-category');
    }
    if (form.valid) {

      //It sends the newTransaction data to the backend via the addTransaction method in the RestDataSource service.

      this.restDataSource.addTransaction(this.newTransaction).subscribe((t) => {
        form.resetForm;

        // Reset the newTransaction object to prepare for the next transaction
        this.newTransaction = new Transaction();

        // Navigate to another route after successful transaction addition
        this.router.navigate(['/ui-components/lists']);
      });
    }
  }
}
