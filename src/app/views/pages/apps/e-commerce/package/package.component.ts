import { Component, OnInit, ViewChild } from '@angular/core';
import { FakeApiService } from '../../../../../core/_base/layout/server/fake-api/fake-api.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

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
		this.setDataSourceAttributes();
	}
	
	dataSource: MatTableDataSource<any>;
	total: number;
	bodega: number;
	porEntregar:number;
	porRecoger:number;
	recogido:number;

	pageIndex: number = 0;
	length: number = 10;
	
	displayedColumns = ['id','tracking','date','customer', 'weight', 'cost', 'assignedTo', 'status'];
	
	packages: any;
	constructor(private fakeApi: FakeApiService,
				private router: Router,
				) { }
	
	ngOnInit(): void {
		this.total = 0;
		this.bodega = 0;
		this.porEntregar = 0;
		this.porRecoger = 0;
		this.recogido = 0;
		var db = this.fakeApi.createDb();
		this.packages = db.packages;
		this.total = this.packages.length;
		this.packages.map((result) => {
			if( result.status == 0 ) { this.bodega ++ }
			if( result.status == 1 ) {this.porEntregar ++}
			if( result.status == 2 ) {this.porRecoger ++}
			if( result.status == 3 ) {this.recogido ++}
		})
		console.log(this.bodega,this.porEntregar,this.porRecoger,this.recogido);
		
		console.log(this.packages);
		this.dataSource = new MatTableDataSource(this.packages);
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
}
