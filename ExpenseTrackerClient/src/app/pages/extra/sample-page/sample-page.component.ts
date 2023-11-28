import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction';
import { RestDataSource } from 'src/app/services/rest.datasource';
import { Router } from '@angular/router';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.css']
})
export class AppSamplePageComponent {

  newTransaction : Transaction = new Transaction(); // Create a new instance of Transaction class

  categories ?: Categories[];

  constructor(private restDataSource: RestDataSource, private router: Router) {
    this.restDataSource.getCategories().subscribe(c=>{
      this.categories = c;
      console.log(this.categories);
    })
  }


  onAddTransaction(form:NgForm) {
    console.log("calling onAddTransaction");
    if (form.valid) {

      console.log('New Transaction:', this.newTransaction);

      //It sends the newTransaction data to the backend via the addTransaction method in the RestDataSource service.

      this.restDataSource.addTransaction(this.newTransaction).subscribe(t => {
        form.resetForm;

         // Reset the newTransaction object to prepare for the next transaction
         this.newTransaction = new Transaction();

         // Navigate to another route after successful transaction addition
        this.router.navigate(['/ui-components/lists']);
      })
  }}


}
