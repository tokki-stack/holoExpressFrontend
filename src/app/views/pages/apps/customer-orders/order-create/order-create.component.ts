import { Component, OnInit } from '@angular/core';
import { StateAreaService } from 'src/app/service/state-area.service';
import { OrdersService } from 'src/app/service/orders.service';
import { PackagesService } from 'src/app/service/packages.service';
import { PackageTypeService } from 'src/app/service/package-type.service';

import { Router } from '@angular/router';

@Component({
  selector: 'kt-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  typeOfService: boolean;
  weightType: string;
  lengthType: string;
  states;
  pickUpAreas;
  deliveryAreas;


  pickUpAddress;
  pickUpState;
  pickUpArea;

  deliveryAddress;
  deliveryState;
  deliveryArea;

  deliveryName;
  deliveryPhone;

  packages = [];
  packageTypes;
  order: any = {};
  tempPackage = {
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    type: '0',
    weightUnit: 'kg',
    lengthUnit: 'cm'
  };

  tempResult;
  constructor(
    private stateAreaService: StateAreaService,
    private ordersService: OrdersService,
    private packagesService: PackagesService,
    private packageTypeService: PackageTypeService,

    private router: Router,

  ) { }

  ngOnInit(): void {
    this.packages.push(this.tempPackage);
    this.stateAreaService.getAllStates().then(result => {
      this.states = result;
      this.packageTypeService.getAllPackageTypes().then(result => {
        this.packageTypes  = result;
        console.log(this.packageTypes);
      })
    });
    this.weightType = 'kg';
    this.lengthType = 'cm';

    this.typeOfService = false;
  }
  serviceType(str) {
    if (str == '1') {
      this.typeOfService = true;
    }
    else {
      this.typeOfService = false;
    }
  }
  changeWeightType(str) {
    this.weightType = str;
  }
  changelengthType(str) {
    this.lengthType = str;
  }
  onStateChange(state, str) {

    if (str == 'p') {
      this.stateAreaService.getAreasByStatesID(state.idstates).then(result => {
        this.pickUpAreas = result;
      });
      this.pickUpState = state;
      this.pickUpAddress = this.pickUpState.name;
    }
    else {
      this.stateAreaService.getAreasByStatesID(state.idstates).then(result => {
        this.deliveryAreas = result;
      });
      this.deliveryState = state;
      this.deliveryAddress = this.deliveryState.name;
    }
  }
  onAreaChange(area, str) {
    if (str == 'p') {
      this.pickUpArea = area;
      this.pickUpAddress = this.pickUpState.name + "----" + this.pickUpArea.name;
    }
    else {
      this.deliveryArea = area;
      this.deliveryAddress = this.deliveryState.name + "----" + this.deliveryArea.name;
    }
  }
  addPackage() {
    if ((this.packages[this.packages.length - 1].weight != 0) &&
      (this.packages[this.packages.length - 1].length != 0) &&
      (this.packages[this.packages.length - 1].width != 0) &&
      (this.packages[this.packages.length - 1].height != 0) &&
      (this.packages[this.packages.length - 1].weight != null) &&
      (this.packages[this.packages.length - 1].length != null) &&
      (this.packages[this.packages.length - 1].width != null) &&
      (this.packages[this.packages.length - 1].height != null)) {
      this.packages.push({
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        type: '0',
        weightUnit: 'kg',
        lengthUnit: 'cm'
      });
    }
    else {
      window.alert("Please input all fields correctly before add another package!")
    }
  }
  deletePackage(_package) {
    const index: number = this.packages.indexOf(_package);
    if (index !== -1) {
      this.packages.splice(index, 1);
    }
  }
  processOrder() {
    this.packages.map(result => {
      result.lengthUnit = this.lengthType;
      result.weightUnit = this.weightType;
    })
    if ((this.packages[this.packages.length - 1].weight != 0) &&
      (this.packages[this.packages.length - 1].length != 0) &&
      (this.packages[this.packages.length - 1].width != 0) &&
      (this.packages[this.packages.length - 1].height != 0) &&
      (this.packages[this.packages.length - 1].weight != null) &&
      (this.packages[this.packages.length - 1].length != null) &&
      (this.packages[this.packages.length - 1].width != null) &&
      (this.packages[this.packages.length - 1].height != null)) {

    }
    else {
      window.alert("Please input all fields correctly!");
      return;
    }

    // this.order.idcustomers = '30';
    this.order.idcustomers = window.localStorage.getItem("idcustomers")

    const now = (new Date().getMonth() + 1).toString() + '/' + new Date().getDate().toString() + '/' + new Date().getFullYear().toString();
    this.order.date = now;
    this.order.pickUpAddressState = this.pickUpState?.idstates;
    this.order.pickUpAddressArea = this.pickUpArea?.idareas;
    this.order.deliveryAddressState = this.deliveryState?.idstates;
    this.order.deliveryAddressArea = this.deliveryArea?.idareas;
    this.order.deliveryAddress = this.deliveryAddress;
    this.order.pickUpAddress = this.pickUpAddress;

    this.order.deliveryName = this.deliveryName;
    this.order.deliveryPhone = this.deliveryPhone;
    if ((this.order.deliveryAddressState == undefined) ||
      (this.order.deliveryAddressArea == undefined) ||
      (this.order.deliveryName == undefined) ||
      (this.order.deliveryPhone == undefined) ||
      (this.order.deliveryAddressState == "") ||
      (this.order.deliveryAddressArea == "") ||
      (this.order.deliveryName == "") ||
      (this.order.deliveryPhone == "")) {
      window.alert("Please input all fields correctly!");
      return;
    }
    if (this.typeOfService) {
      this.order.deliveryType = '0';
    }
    else {
      this.order.deliveryType = '1';
      if ((this.order.pickUpAddressState == undefined) ||
        (this.order.pickUpAddressArea == undefined) ||
        (this.order.pickUpAddressState == "") ||
        (this.order.pickUpAddressArea == "")) {
        window.alert("Please input all fields correctly!");
        return;
      }
    }
    this.ordersService.createNewOrder(this.order).then(async result => {
      this.tempResult = result;
      if (this.tempResult.insertId) {
        await this.packages.map(async result => {
          result.idorders = this.tempResult.insertId;
          if (this.order.deliveryType == '0') {
            result.status = '2'
          }
          else {
            result.status = '0'
          }
          await this.packagesService.createNewPackage(result).then(result => {
          })
        })
        window.alert("successfully created!");
        this.router.navigate(['orders/myOrder']); // Main page

      }
      else {
        window.alert("error occured")
      }
    })

  }



}
