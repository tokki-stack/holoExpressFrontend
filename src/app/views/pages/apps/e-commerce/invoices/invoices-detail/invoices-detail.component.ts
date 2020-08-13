import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InvoicesNewPaymentComponent } from '../invoices-new-payment/invoices-new-payment.component'
@Component({
  selector: 'kt-invoices-detail',
  templateUrl: './invoices-detail.component.html',
  styleUrls: ['./invoices-detail.component.scss']
})
export class InvoicesDetailComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  dataSourcePagos: MatTableDataSource<any>;
  dataSourceLogs: MatTableDataSource<any>;

  displayedColumns = ['description', 'total'];
  displayedColumnsPagos = ['paymentID', 'date', 'description', 'amount', 'user', 'actions'];
  displayedColumnsLogs = ['date', 'description', 'user'];

  title: any;
  buttonStyle: any;


  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.title = "OPEN";
    this.buttonStyle = { 'color': '#3699FF', 'background-color': '#cbe2fe' };
    this.dataSource = new MatTableDataSource(this.detail);
    this.dataSourcePagos = new MatTableDataSource(this.pagos);
    this.dataSourceLogs = new MatTableDataSource(this.logs);

  }
  openNewPayment() {
    const dialogRef = this.dialog.open(InvoicesNewPaymentComponent, { data: {} });

  }
  menuChange(event) {
    this.title = event.target.outerText;
    if (this.title == "OPEN") {
      this.buttonStyle = { 'color': '#3699FF', 'background-color': '#cbe2fe' };

    }
    else {
      this.buttonStyle = { 'color': '#1bc5bd', 'background-color': '#c9f7f5' };
    }
  }
  detail: any = [
    {
      id: 0,
      description: 'Servicico de entrega ID8541',
      total: '50.00'
    },
    {
      id: 1,
      description: 'Servicico de entrega ID8541',
      total: '50.00'
    },
    {
      id: 2,
      description: 'Servicico de entrega ID8541',
      total: '50.00'
    },
    {
      id: 3,
      description: '',
      total: ''
    },
    {
      id: 3,
      description: '',
      total: ''
    },
    {
      id: 3,
      description: '',
      total: ''
    },
    {
      id: 3,
      description: 'Discount',
      total: '-50'
    },
    {
      id: 3,
      description: 'sub total',
      total: '100'
    },
    {
      id: 3,
      description: 'items',
      total: '7.00'
    },
    {
      id: 3,
      description: 'Total',
      total: '107'
    },
  ]
  pagos: any = [
    {
      id: 0,
      paymentID: 123,
      date: '02/02/20 14:28pm',
      description: 'Pago de factura',
      amount: '50.00',
      user: 'jdoe',
      actions: 1
    },
    {
      id: 1,
      paymentID: 123,
      date: '02/02/20 14:28pm',
      description: 'Pago colectado par empleado',
      amount: '50.00',
      user: 'mruiz',
      actions: 1
    },
    {
      id: 2,
      paymentID: 123,
      date: '02/02/20 14:28pm',
      description: 'Pago de factura',
      amount: '50.00',
      user: 'jdoe',
      actions: 0
    }
  ]
  logs: any = [
    {
      id: 0,
      date: '02/02/20 14:28pm',
      description: 'Order 32512 Price 2.34-->3.38',
      user: 'MRuiz',
    },
    {
      id: 1,
      date: '02/02/20 14:28pm',
      description: 'Added order 14521512 45214',
      user: 'JDoe',
    },
    {
      id: 2,
      date: '02/02/20 14:28pm',
      description: 'Removed custom charge 50.00',
      user: 'JDoe',
    },
  ]

}
