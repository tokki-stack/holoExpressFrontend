import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'kt-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.scss']
})
export class CustomerInvoiceComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  dataSourcePagos: MatTableDataSource<any>;

  displayedColumns = ['description','total'];
	displayedColumnsPagos = ['paymentID','date','description','amount'];
  

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.description);
    this.dataSourcePagos = new MatTableDataSource(this.pagos);

  }
  description:any = [
    {
      id: 0,
      description: 'Servicio de entrega ID',
      total: '50.00',
    },
    {
      id: 1,
      description: 'Servicio de entrega ID',
      total: '50.00',
    },
    {
      id: 2,
      description: 'Servicio de entrega ID',
      total: '50.00',
    },
    {
      id: 3,
      description: '',
      total: '',
    },
    {
      id: 4,
      description: '',
      total: '',
    },
    {
      id: 5,
      description: '',
      total: '',
    },
    {
      id: 6,
      description: 'Discount',
      total: '-50.00',
    },
    {
      id: 7,
      description: 'Sub Total',
      total: '100.00',
    },
    {
      id: 8,
      description: 'items',
      total: '7.00',
    },
    {
      id: 9,
      description: 'Total',
      total: '107.00',
    }
  ]
  pagos: any =[
    {
      id:0,
      paymentID: 123,
      date: '02/02/20 14:28pm',
      description: 'Pago de factura',
      amount: '50.00'
    },
    {
      id:1,
      paymentID: 122,
      date: '02/02/20 14:28pm',
      description: 'Pago colectado par empleado',
      amount: '50.00'
    }
  ]
}
