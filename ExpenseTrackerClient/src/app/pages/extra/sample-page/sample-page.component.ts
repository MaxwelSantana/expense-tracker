import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction';
import { RestDataSource } from 'src/app/services/rest.datasource';


@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.css']
})
export class AppSamplePageComponent {  
  
  newTransaction : Transaction = new Transaction(); // Create a new instance of Transaction class

  constructor(private restDataSource: RestDataSource) {}


  onAddTransaction(form:NgForm) {
    if (form.valid) {      
      
      this.restDataSource.addTransaction(this.newTransaction).subscribe(t => {
        form.resetForm;
      })    
  }} 
}