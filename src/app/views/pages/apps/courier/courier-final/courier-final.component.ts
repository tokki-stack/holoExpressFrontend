import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PackagesService } from 'src/app/service/packages.service';
import { OrdersService } from 'src/app/service/orders.service';

import { result } from 'lodash';

@Component({
  selector: 'kt-courier-final',
  templateUrl: './courier-final.component.html',
  styleUrls: ['./courier-final.component.scss']
})
export class CourierFinalComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private packagesService: PackagesService,
    private ordersService: OrdersService,

  ) { }

  order;
  packages;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.order = params;
    })
  }
  signature() {
    if (window.confirm("scanning signature!")) {
      this.ordersService.setOrderStatus(this.order.idorders, '').then(result => {
        this.packagesService.getPackagesByOrderID(this.order.idorders).then(packages => {
          this.packages = packages;
          this.packages.map(_package => {
            this.packagesService.setPackageStatus(_package, '5').then(result => {
            })
          })
        })
      })
      window.alert("successfully delivered");
      this.router.navigate(['courier']);

    }
  }
  back() {
    this.router.navigate(['courier']);
  }

}
