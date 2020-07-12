
import { Component, OnInit, ViewChild } from '@angular/core';
import { FakeApiService } from '../../../../../../core/_base/layout/server/fake-api/fake-api.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderEditComponent } from '../order-edit/order-edit.component'
@Component({
	selector: 'kt-orders-list',
	templateUrl: './orders-list.component.html',
})
export class OrdersListComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
		this.paginator = mp;
		this.setDataSourceAttributes();
	}
	
	dataSource: MatTableDataSource<any>;
	total: number;
	pending: number;
	inProgress:number;
	pickUp:number;

	pageIndex: number = 0;
	length: number = 10;
	
	displayedColumns = ['id','tracking','date','customer', 'weight', 'cost', 'assignedTo', 'status'];
	
	orders: any;
	openOrders = [];
	closedOrders = [];
	title: any;
	openFlag: number;
	completed: number;
	cancelled: number;
	
	constructor(private fakeApi: FakeApiService,
				private router: Router,
				public dialog: MatDialog
				) { }
	
	ngOnInit(): void {
		this.openFlag = 1;
		this.completed = 0;
		this.cancelled = 0;

		this.title = "Open Orders"
		this.total = 0;
		this.pending = 0;
		this.inProgress = 0;
		this.pickUp = 0;
		var db = this.fakeApi.createDb();
		this.orders = db.orders;
		this.orders.map((result) => {
			if(result.isOpen == true){
				if( result.status == 0 ) { this.pending ++ }
				if( result.status == 1 ) {this.inProgress ++}
				if( result.status == 2 ) {this.pickUp ++}
				this.openOrders.push(result);
			}
			else{
				if( result.status == 0 ) { this.completed ++ }
				if( result.status == 1 ) {this.cancelled ++}
				this.closedOrders.push(result);
			}
		})
		this.total = this.openOrders.length;
		console.log(this.orders, this.openOrders, this.closedOrders);
		this.dataSource = new MatTableDataSource(this.openOrders);
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
		console.log(filterValue);
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
		console.log(this.dataSource.filter);
	}
	packageView(){
		this.router.navigate(['ecommerce/package/view']);
	}
	menuChange(event){
		console.log("here",event.target.outerText);
		this.title = event.target.outerText;
		if (this.title == "Open Orders"){
			this.openFlag = 1;
			this.dataSource = new MatTableDataSource(this.openOrders);
			this.total = this.openOrders.length;

		}
		else if (this.title == "Closed Orders") {
			this.openFlag = 2;
			this.dataSource = new MatTableDataSource(this.closedOrders);
			this.total = this.closedOrders.length;

		}
		else{
			this.openFlag = 0;
			this.dataSource = new MatTableDataSource(this.orders);
			this.total = this.orders.length;

		}
		console.log("this.openFlag",this.openFlag)
	}
	newOrder(){
		const dialogRef = this.dialog.open(OrderEditComponent, { data: {} });

	}
}
