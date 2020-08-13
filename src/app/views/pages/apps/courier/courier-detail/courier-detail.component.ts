import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PackagesService } from 'src/app/service/packages.service';

@Component({
  selector: 'kt-courier-detail',
  templateUrl: './courier-detail.component.html',
  styleUrls: ['./courier-detail.component.scss']
})
export class CourierDetailComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['weight', 'volWeight', 'length', 'width', 'height', 'type'];

  order;
  accepted: boolean;
  packages;
  constructor(private route: ActivatedRoute,
    private packagesService: PackagesService,
    private router: Router) { }

  ngOnInit(): void {
    this.accepted = false;

    this.route.queryParams.subscribe(params => {
      this.order = params;
      if (this.order.accept == "accept") {
        this.accepted = true;
      }
    })
    this.packagesService.getPackagesByOrderID(this.order.idorders).then(packages => {
      this.packages = packages;
      this.dataSource = new MatTableDataSource(this.packages);
    })

  }
  back() {
    this.router.navigate(['courier']);
  }
  edit() {
    let naviagtionExtras: NavigationExtras = {
      queryParams: this.order
    }
    this.router.navigate(['courier/edit'], naviagtionExtras);
  }
  status() {
    if (window.confirm("Are you going to update information?")) {
      this.packages.map(_package => {
        this.packagesService.setPackageStatus(_package, '1').then(result => {
        })
      })
      this.router.navigate(['courier']);
    }
  }
  final() {
    let naviagtionExtras: NavigationExtras = {
      queryParams: this.order
    }
    this.router.navigate(['courier/final'], naviagtionExtras);
  }
}
