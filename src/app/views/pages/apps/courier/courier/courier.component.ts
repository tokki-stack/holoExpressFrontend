import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PackagesService } from 'src/app/service/packages.service';
import { OrdersService } from 'src/app/service/orders.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'kt-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss']
})
export class CourierComponent implements OnInit {

  constructor(
    private router: Router,
    private packagesService: PackagesService,
    private ordersService: OrdersService,
    private customerService: CustomerService,

  ) { }

  assignedTo;
  tempResult;
  orderPickUp = [];
  orderDelivering = [];

  orders;

  ngOnInit(): void {
    this.assignedTo = '1';
    this.ordersService.getOrdersBymessengerID(this.assignedTo).then(async result => {
      this.orders = result;
      await this.orders.map(async order => {
        await this.customerService.getCustomerByID(order.idcustomers).then(async result => {
          this.tempResult = result;
          order.customer = this.tempResult[0].firstName;
          await this.packagesService.getPackagesByOrderID(order.idorders).then(packages => {
            this.tempResult = packages;
            order.packageStatus = this.tempResult[0].status;
            order.items = this.tempResult.length;
          })
        })
        if (order.packageStatus == 0 || order.packageStatus == 1) {
          this.orderPickUp.push(order);
        }
        if (order.packageStatus == 3) {
          this.orderDelivering.push(order);
        }
      })
    })
  }
  viewOrderDetail(order) {
    let naviagtionExtras: NavigationExtras = {
      queryParams: order
    }
    this.router.navigate(['courier/detail'], naviagtionExtras);
  }
}
