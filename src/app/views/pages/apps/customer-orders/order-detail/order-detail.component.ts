import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryProofComponent } from './delivery-proof/delivery-proof.component';
import { ActivatedRoute, Router } from "@angular/router";
import { PackagesService } from 'src/app/service/packages.service';
import { PackageTypeService } from 'src/app/service/package-type.service';

@Component({
  selector: 'kt-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['weight', 'volWeight', 'length', 'width', 'height', 'type'];
  isLinear = false;

  order;
  packages;
  tempResult;
  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private packagesService: PackagesService,
    private packageTypeService: PackageTypeService,

    
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.order = params;
    })
    this.packagesService.getPackagesByOrderID(this.order.idorders).then(result => {
      this.packages = result;
      console.log(this.packages);
      this.packages.map(_package => {
        console.log(_package);
        this.packageTypeService.getPackageTypeByID(_package.type).then(result => {
          this.tempResult = result;
          console.log(this.tempResult);

          _package.typeName = this.tempResult[0].name;
          // console.log(_package.typeName);

          this.dataSource = new MatTableDataSource(this.packages);
        })
      })
    })
  }
  deliveryProof(): void {
    const dialogRef = this.dialog.open(DeliveryProofComponent, { data: {} });
  }
}
