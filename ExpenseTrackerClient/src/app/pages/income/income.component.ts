import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction';
import { RestDataSource } from 'src/app/services/rest.datasource';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html'
})
export class IncomeComponent {

  transactions ?: Transaction[] | null ;
  
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
