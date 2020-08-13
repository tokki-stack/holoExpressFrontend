// Angular
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/service/customer.service';
import { OrdersService } from 'src/app/service/orders.service';
import { PackagesService } from 'src/app/service/packages.service';
import { StateAreaService } from 'src/app/service/state-area.service';
import { Router } from '@angular/router';
import { result } from 'lodash';

@Component({
	selector: 'kt-order-edit',
	templateUrl: './order-edit.component.html'
})
export class OrderEditComponent implements OnInit {
	myControl = new FormControl();
	options: any = [];
	allCustomers;
	filteredOptions: Observable<string[]>;
	deliveryType;

	order;
	packages;
	states;
	deliveryAreas;
	pickUpAreas;

	weightType;
	lengthType;

	deletedPackage = [];

	tempResult;
	constructor(public dialogRef: MatDialogRef<OrderEditComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private router: Router,
		private customerService: CustomerService,
		private ordersService: OrdersService,
		private packagesService: PackagesService,
		private stateAreaService: StateAreaService,


	) { }
	async ngOnInit(): Promise<void> {
		this.weightType = 'kg';
		this.lengthType = 'cm';
		if (this.data.order) {
			this.order = this.data.order;

			this.packagesService.getPackagesByOrderID(this.order.idorders).then(packages => {
				this.packages = packages;
			})
			this.stateAreaService.getAllStates().then(states => {
				this.states = states;
				this.states.map(state => {
					state.idstates = state.idstates.toString();
				})
				this.stateAreaService.getAreasByStatesID(this.order.deliveryAddressState).then(areas => {
					this.deliveryAreas = areas;
					this.deliveryAreas.map(area => {
						area.idareas = area.idareas.toString();
					})
				})
				this.stateAreaService.getAreasByStatesID(this.order.pickUpAddressState).then(areas => {
					this.pickUpAreas = areas;
					this.pickUpAreas.map(area => {
						area.idareas = area.idareas.toString();
					})
				})
			})
			await this.customerService.getAll().then(async result => {
				this.allCustomers = result;
				await this.allCustomers.map(result => {
					this.options.push({ firstName: result.firstName, idcustomers: result.idcustomers });
				})
			})
		}
		else {
			this.order = {
				billing: "",
				cost: "",
				customer: "",
				date: "",
				deliveryAddress: "",
				deliveryAddressArea: "0",
				deliveryAddressState: "0",
				deliveryName: "",
				deliveryPhone: "",
				deliveryType: "0",
				idcustomers: "",
				items: "",
				pickUpAddress: "",
				pickUpAddressArea: "0",
				pickUpAddressState: "0",
				status: "0",
				unit: "",
				volWeight: "",
				weight: ""
			}
			this.packages = [{
				cost: "",
				height: "",
				length: "",
				lengthUnit: "",
				status: "",
				type: "",
				weight: "",
				weightUnit: "",
				width: "",
			}]

			this.stateAreaService.getAllStates().then(states => {
				this.states = states;
				this.states.map(state => {
					state.idstates = state.idstates.toString();
				})
				this.stateAreaService.getAreasByStatesID(this.order.deliveryAddressState).then(areas => {
					this.deliveryAreas = areas;
					this.deliveryAreas.map(area => {
						area.idareas = area.idareas.toString();
					})
				})
				this.stateAreaService.getAreasByStatesID(this.order.pickUpAddressState).then(areas => {
					this.pickUpAreas = areas;
					this.pickUpAreas.map(area => {
						area.idareas = area.idareas.toString();
					})
				})
			})


			await this.customerService.getAll().then(async result => {
				this.allCustomers = result;
				await this.allCustomers.map(result => {
					this.options.push({ firstName: result.firstName, idcustomers: result.idcustomers });
				})

			})
		}
		this.deliveryType = 'pickup';
		this.filteredOptions = this.myControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value))
		);
	}

	changeWeightType(str) {
		this.weightType = str;
	}

	changelengthType(str) {
		this.lengthType = str;
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

	customerChange(option) {
		this.order.idcustomers = option.idcustomers;
	}

	deletePackage(_package) {
		const index: number = this.packages.indexOf(_package);
		if (index !== -1) {
			this.packages.splice(index, 1);
			this.deletedPackage.push(_package);
		}
	}

	save() {
		if (window.confirm("are you sure to save chagnes?")) {
			this.order.items = this.packages.length;
			if (this.order.idorders) {
				this.ordersService.updateOrder(this.order).then(result => {
					this.packages.map(_package => {
						if (this.deletePackage.length >= 1) {
							this.deletedPackage.map(_package => {
								this.packagesService.deletePackage(_package).then(result => {
								})
							});
						}
						if (_package.idpackages) {
							this.packagesService.updatePackage(_package).then(result => {

							})
						}
						else {
							_package.idorders = this.order.idorders;
							_package.status = this.packages[0].status;
							_package.cost = '';
							this.packagesService.createNewPackage(_package).then(result => {
							})
						}
					})

					window.alert("successfully saved!");
					this.dialogRef.close();
				})
			}
			else {
				this.ordersService.createNewOrder(this.order).then(result => {
					this.tempResult = result;
					this.packages.map(_package => {
						_package.idorders = this.tempResult.insertId;
						if (this.order.deliveryType == '0') {
							_package.status = '2'
						}
						else {
							_package.status = '0'
						}
						_package.cost = '';
						this.packagesService.createNewPackage(_package).then(result => {
						})
					})
					window.alert("successfully created!");
					this.dialogRef.close();
				})
			}
		}
	}

	cancel() {
		this.dialogRef.close();
	}

	StateChange(state, str) {
		if (str == 'p') {
			this.stateAreaService.getAreasByStatesID(state.idstates).then(result => {
				this.pickUpAreas = result;
			})
		}
		else {
			this.stateAreaService.getAreasByStatesID(state.idstates).then(result => {
				this.deliveryAreas = result;
			})
		}

	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.options.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
	}
}
