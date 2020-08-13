import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PackagesService } from 'src/app/service/packages.service';
import { StateAreaService } from 'src/app/service/state-area.service';
import { OrdersService } from 'src/app/service/orders.service';

@Component({
  selector: 'kt-courier-edit',
  templateUrl: './courier-edit.component.html',
  styleUrls: ['./courier-edit.component.scss']
})
export class CourierEditComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private packagesService: PackagesService,
    private stateAreaService: StateAreaService,
    private ordersService: OrdersService,


  ) { }
  order;

  packages;
  states;
  areas;
  deliveryArea;
  deliveryState;
  tempResult;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.order = params;
      this.deliveryState = this.order.deliveryAddressState;
      this.deliveryArea = this.order.deliveryAddressArea;

    })
    this.packagesService.getPackagesByOrderID(this.order.idorders).then(result => {
      this.packages = result;
    });
    this.stateAreaService.getAllStates().then(result => {
      this.states = result;
      this.states.map(state => {
        state.idstates = state.idstates.toString();
      })
      this.stateAreaService.getAreasByStatesID(this.order.deliveryAddressState).then(result => {
        this.areas = result;
        this.areas.map(area => {
          area.idareas = area.idareas.toString();
        })
      });
    });
  }
  onStateChange(state) {
    this.stateAreaService.getAreasByStatesID(state.idstates).then(result => {
      this.areas = result;
      this.areas.map(area => {
        area.idareas = area.idareas.toString();
      })
      this.deliveryArea = this.areas[0].idareas
    });
  }
  back() {
    this.router.navigate(['courier']);
  }
  save() {
    if (window.confirm("Are you going to update information?")) {
      var idorders = this.order.idorders;
      var deliveryAddress = { deliveryState: this.deliveryState, deliveryArea: this.deliveryArea }
      this.ordersService.editOrderdeliveryByID(idorders, deliveryAddress).then(result => {
        this.tempResult = result;
        if (this.tempResult.status == 'error') {
          window.alert("error occured!")
        }
        else {
          this.packages.map(_package => {
            this.packagesService.updatePackage(_package).then(result => {
            })
          })
          window.alert("successfully updated!")

        }
      })
    }
  }
}
