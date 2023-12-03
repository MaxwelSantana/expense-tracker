import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { BudgetEntries } from 'src/app/models/budget-entries';
import { Categories, Categories as Category } from 'src/app/models/categories';
import { BudgetRepository } from 'src/app/repository/budget.repository';

const moment = _rollupMoment || _moment;

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sunil Joshi',
    position: 'Web Designer',
    productName: 'Elite Admin',
    budget: 3.9,
    priority: 'low',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Andrew McDownland',
    position: 'Project Manager',
    productName: 'Real Homes Theme',
    budget: 24.5,
    priority: 'medium',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Christopher Jamil',
    position: 'Project Manager',
    productName: 'MedicalPro Theme',
    budget: 12.8,
    priority: 'high',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Nirav Joshi',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    budget: 2.4,
    priority: 'critical',
  },
];

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent {
  date = new FormControl(moment());

  displayedColumns: string[] = ['name', 'assigned', 'activity', 'available'];
  currentEditCategory: Category | null;
  balance: number = 1000;  
  Cat : Categories = new Categories();
  targetForm = false;
  @ViewChild('newCategoryInput', { static: false }) newCategoryInput!: ElementRef;

  constructor(
    private repository: BudgetRepository,
    private activeRoute: ActivatedRoute
  ) {
    const key = this.activeRoute.snapshot.params['key'];
    this.repository.getBudget(key);    
    }  

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  get categoriesDataSource(): Array<any> {
    const flattenList: any = [];
    this.repository.categoryGroups?.forEach((categoryGroup) => {
      flattenList.push({ ...categoryGroup, isGroup: true });
      flattenList.push(...categoryGroup.categories);
    });    
    return flattenList;
  }

  isGroup(index: any, item: any): boolean {
    return item.isGroup;
  }

  getEntry(category: Category): BudgetEntries {
    return this.repository.budgetEntries[category._id];
  }

  getAssignedAmount(category: Category) {
    const entry = this.getEntry(category);
    return entry?.assigned || 0;
  }

  getAmountAvailable(category: Category) {
    const target = category?.target?.amount || 0;
    return target - this.getAssignedAmount(category);
  }

  isEditing(category: any) {
    if (!this.currentEditCategory) {
      return false;
    }
    return category?._id == this.currentEditCategory._id;
  }

  edit(category: any) {
    console.log('passou');
    this.currentEditCategory = category;
  }

  onChangeAssignedValue(event: Event, category: Category) {
    const value = (event.target as HTMLInputElement).value;
    console.log({ value, category }); 
    
    const availableAmount = this.getAmountAvailable(category);
    if (availableAmount - parseInt(value) <= 0) {
      window.alert('Assigned value exceeds available amount or is equal to 0');      
    }
    
    const entry = this.getEntry(category);
    if (!entry || !entry._id) {
      this.repository.createBudgetEntry({
        budgetId: this.repository.budgetId,
        categoryId: category._id,
        assigned: parseInt(value),
      });
    } else {
      this.repository.updateBudgetEntry({
        ...entry,
        assigned: parseInt(value),
      });
    }    
    this.currentEditCategory = null;
  }

  showPopover = false;
  inputValue = '';

  togglePopover(): void {
    this.showPopover = !this.showPopover;    ;
  } 

  addCategory(group:string, newCategory: string){
    const catGroups = this.repository.categoryGroups;
    const inputVal = this.newCategoryInput.nativeElement.value;  
    const inputValue = newCategory;  
    this.newCategoryInput.nativeElement.value = '';
    if(group === "Bills"){      
      this.Cat.categoryGroupId = catGroups[0]._id;
      this.Cat.name = newCategory;
      console.log("newCat", this.Cat)
      if(this.Cat.name !== ''){
        this.repository.addCategory(this.Cat);
        window.location.reload();
      }
      
    }
    else{
      this.Cat.categoryGroupId = catGroups[1]._id;
      this.Cat.name = newCategory;
      console.log("newCat", this.Cat)
      if(this.Cat.name !== ''){
        this.repository.addCategory(this.Cat);
        window.location.reload();
      }
    }    
  }

  removeCategory(){
    console.log(this.currentEditCategory);
    if(this.currentEditCategory !== null){      
      this.repository.deleteCategory(this.currentEditCategory);
      window.location.reload();
    }
  }

  editTarget(){
    this.targetForm = !this.targetForm;
    console.log(this.targetForm);
    
  }

  targetType: string;
  targetAmount:number;
  targetFrequency: string;

  saveTarget(){
    console.log(this.targetAmount,this.targetFrequency,this.targetType);    
    if(this.currentEditCategory !== null){          
      this.currentEditCategory.target = {targetType: '', amount: 0, frequency: ''}!;       
      this.currentEditCategory.target.targetType = this.targetType!;
      this.currentEditCategory.target.amount = this.targetAmount;
      this.currentEditCategory.target.frequency = this.targetFrequency;
      console.log(this.currentEditCategory);    
      this.repository.editTarget(this.currentEditCategory);
      window.location.reload();
    }
  }

  alert(category:any){
    const availableAmount = this.getAmountAvailable(category);
    console.log("test",availableAmount);
    if (availableAmount <= 0) {
      window.alert('Available amount is insufficient or equal to 0');
      return;
    }
    this.currentEditCategory = category;
  }

}
