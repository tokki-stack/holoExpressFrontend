import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FakeApiService } from '../../../../../core/_base/layout/server/fake-api/fake-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/service/orders.service';
import { CustomerService } from 'src/app/service/customer.service';
import { PackagesService } from 'src/app/service/packages.service';

@Component({
	selector: 'kt-package',
	templateUrl: './package.component.html',
	styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
		this.paginator = mp;
		// this.setDataSourceAttributes();
	}

	dataSource: MatTableDataSource<any>;
	total: number;
	bodega: number;
	porEntregar: number;
	porRecoger: number;
	recogido: number;

	pageIndex: number = 0;
	length: number = 10;

	displayedColumns = ['id', 'tracking', 'date', 'customer', 'weight', 'cost', 'assignedTo', 'status'];

	packages: any;
	constructor(private fakeApi: FakeApiService,
		private router: Router,
		private customerService: CustomerService,
		private ordersService: OrdersService,
		private packagesService: PackagesService,
		private changeDetectorRefs: ChangeDetectorRef

	) { }

	ngOnInit(): void {
		this.total = 0;
		this.bodega = 0;
		this.porEntregar = 0;
		this.porRecoger = 0;
		this.recogido = 0;

		this.packagesService.getAllPackages().then(async result => {
			this.packages = result;
			await this.packages.map(async result => {
				await this.packagesService.getCustomerByorderID(result.idorders).then(results => {
					result.customer = results[0].firstName;
				});
				await this.packagesService.getMessengerByorderID(result.idorders).then(results => {
					result.assignedTo = results[0]?.name;
					this.dataSource = new MatTableDataSource(this.packages);
					this.changeDetectorRefs.detectChanges();
					this.setDataSourceAttributes();
				});
				if (result.status == 0) { this.porRecoger++ }
				if (result.status == 1) { this.recogido++ }
				if (result.status == 2) { this.bodega++ }
				if (result.status == 3) { this.porEntregar++ }
			})
			this.total = this.packages.length;


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
}
