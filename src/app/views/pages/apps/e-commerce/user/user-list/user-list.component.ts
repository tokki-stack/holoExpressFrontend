import { Component, OnInit, ViewChild } from '@angular/core';
import { FakeApiService } from '../../../../../../core/_base/layout/server/fake-api/fake-api.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from '../user-detail/user-detail.component';
@Component({
  selector: 'kt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
		this.paginator = mp;
		this.setDataSourceAttributes();
  }
	dataSource: MatTableDataSource<any>;
	displayedColumns = ['name','user','type','status'];
	pageIndex: number = 0;
	length: number = 10;

  total: number = 0;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users);
    this.total = this.users.length;
  }
	setDataSourceAttributes() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
  }
  onPaginateChange(event) {
		this.pageIndex = event.pageIndex;
		this.length = event.pageSize;
	}
  // const dialogRef = this.dialog.open(PackageModalComponent, { data: { pack } });

  applyFilter(filterValue: string) {
		console.log(filterValue);
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
		console.log(this.dataSource.filter);
  }
  userDetail(user){
    console.log(user);
  const dialogRef = this.dialog.open(UserDetailComponent, { data: { user } });

  }
  users: any = [
    {
      id: 0,
      name: "Roderick Castillo",
      user: "Rcastillo",
      type: 0,
      status: 0
    },
    {
      id: 1,
      name: "Roderick Castillo",
      user: "Rcastillo",
      type: 1,
      status: 0
    },
    {
      id: 2,
      name: "Roderick Castillo",
      user: "Rcastillo",
      type: 2,
      status: 0
    },
    {
      id: 3,
      name: "Roderick Castillo",
      user: "Rcastillo",
      type: 0,
      status: 1
    },
    {
      id: 4,
      name: "Roderick Castillo",
      user: "Rcastillo",
      type: 1,
      status: 1
    }
  ];
}
