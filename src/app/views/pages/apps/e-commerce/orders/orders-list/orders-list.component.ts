
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FakeApiService } from '../../../../../../core/_base/layout/server/fake-api/fake-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderEditComponent } from '../order-edit/order-edit.component'
import { OrdersService } from 'src/app/service/orders.service';
import { CustomerService } from 'src/app/service/customer.service';
import { PackagesService } from 'src/app/service/packages.service';
@Component({
	selector: 'kt-orders-list',
	templateUrl: './orders-list.component.html',
})
export class OrdersListComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
		this.paginator = mp;
		// this.setDataSourceAttributes();
	}

	dataSource: MatTableDataSource<any>;
	total: number;
	pending: number;
	inProgress: number;
	pickUp: number;

	pageIndex: number = 0;
	length: number = 10;

	displayedColumns = ['check', 'id', 'date', 'customer', 'items', 'cost', 'billing', 'status'];

	orders: any;
	openOrders = [];
	closedOrders = [];
	title: any;
	openFlag: number;
	completed: number;
	cancelled: number;
	packages;
	constructor(private fakeApi: FakeApiService,
		private router: Router,
		public dialog: MatDialog,
		private ordersService: OrdersService,
		private customerService: CustomerService,
		private changeDetectorRefs: ChangeDetectorRef,
		private packagesService: PackagesService,

	) { }

	async ngOnInit(): Promise<void> {
		this.orders = [];
		this.pending = 0;
		this.inProgress = 0;
		this.completed = 0;
		this.cancelled = 0;
		this.openFlag = 1;
		this.title = "Open Orders"
		this.total = 0;

		await this.ordersService.getAllOrders().then(async result => {
			this.orders = result;
			await this.orders.map(async result => {
				await this.customerService.getCustomerByID(result.idcustomers).then(result1 => {
					result['customer'] = result1[0].firstName;
					this.packagesService.getPackagesByOrderID(result.idorders).then(packages => {
						this.packages = packages;
						result['items'] = this.packages.length;
					})

				})
				if (result.status == '0') {
					this.pending++;
					this.openOrders.push(result);
				}
				else if (result.status == '1') {
					this.inProgress++;
					this.openOrders.push(result);

				}
				else if (result.status == '2') {
					this.completed++;
					this.closedOrders.push(result);
				}
				else if (result.status == '3') {
					this.cancelled++;
					this.closedOrders.push(result);
				}
				this.total = this.openOrders.length;
				this.dataSource = new MatTableDataSource(this.openOrders);
				this.changeDetectorRefs.detectChanges();
				this.setDataSourceAttributes;
			})


		})
	}


	onPaginateChange(event) {
		this.pageIndex = event.pageIndex;
		this.length = event.pageSize;
	}

	setDataSourceAttributes() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	packageView() {
		this.router.navigate(['ecommerce/package/view']);
	}
	orderView(order) {
		const dialogRef = this.dialog.open(OrderEditComponent, { data: { order: order } });
	}
	menuChange(event) {
		this.title = event.target.outerText;
		if (this.title == "Open Orders") {
			this.openFlag = 1;
			this.dataSource = new MatTableDataSource(this.openOrders);
			this.total = this.openOrders.length;
			this.displayedColumns = ['check', 'id', 'date', 'customer', 'items', 'cost', 'billing', 'status'];
		}
		else if (this.title == "Closed Orders") {
			this.openFlag = 2;
			this.dataSource = new MatTableDataSource(this.closedOrders);
			this.total = this.closedOrders.length;
			this.displayedColumns = ['id', 'date', 'customer', 'items', 'cost', 'billing', 'status'];

		}
		else {
			this.openFlag = 0;
			this.dataSource = new MatTableDataSource(this.orders);
			this.total = this.orders.length;
			this.displayedColumns = ['id', 'date', 'customer', 'items', 'cost', 'billing', 'status'];

		}
	}
	newOrder() {
		const dialogRef = this.dialog.open(OrderEditComponent, { data: {} });
	}
}
