import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction';
import { RestDataSource } from 'src/app/services/rest.datasource';
import * as XLSX from 'xlsx';

import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html'
})
export class IncomeComponent {

  transactions ?: Transaction[] | null ;
  date: any;
  
  constructor(private dataSource: RestDataSource) {
    this.dataSource.getTransactions().subscribe(t=> {
    this.transactions = t;
    console.log(this.transactions);
    })
  }

  sumIncome(transactions: Transaction[]): number {
    let sumIncome = 0;

      for(let i =0; i<transactions.length; i++){
        if(transactions[i].status === "Received"){
          sumIncome = sumIncome + this.calculateSubtotal(transactions[i])
      }
      }
    return sumIncome;
  }

  calculateSubtotal(transaction: Transaction): number {
    return transaction.quantity * transaction.amount;
  }

  sumPayment(transactions: Transaction[]): number {
    let sumPayment = 0;

      for(let i =0; i<transactions.length; i++){
        if(transactions[i].status === "Payment"){
          sumPayment = sumPayment + this.calculateSubtotal(transactions[i])
      }
      }
    return sumPayment;
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
  /** Default name for excel file when downloaded */
  fileName= "ExcelSheet.xlsx"
  exportExcel(){
    /**passing table id */
    let data = document.getElementById("table-data");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /**Generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    /**save to file */
    XLSX.writeFile(wb, this.fileName)

  }
}
