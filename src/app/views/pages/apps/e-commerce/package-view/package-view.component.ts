import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PackageModalComponent } from './../modal/package-modal/package-modal.component'
@Component({
  selector: 'kt-package-view',
  templateUrl: './package-view.component.html',
  styleUrls: ['./package-view.component.scss']
})
export class PackageViewComponent implements OnInit {
	@ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
	dataSourceLog: MatTableDataSource<any>;
  
	displayedColumns = ['tracking','weight','volWeight','length', 'width', 'height', 'type', 'cost', 'status', 'log'];
	displayedColumnsLog = ['date','description','user'];


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.packages);
		this.dataSourceLog = new MatTableDataSource(this.logs);
    
  }
  log(pack){
		const dialogRef = this.dialog.open(PackageModalComponent, { data: { pack } });

  }
  packages: any = [
    {
      id: 1,
      tracking: 'H000001',
      weight: '2.2',
      volWeight: '2.3',
      length: '2',
      width: 12,
      height: 7,
      type: 'box',
      cost: '3.50',
      status: 0,
    },
    {
      id: 2,
      tracking: 'H000002',
      weight: '2.3',
      volWeight: '0.7',
      length: '2',
      width: 12,
      height: 7,
      type: 'envelop',
      cost: '2.50',
      status: 0,
    }

  ];
  logs: any = [
    {
      id: 1,
      date: '02/02/20 14:28pm',
      description: 'Order Completed',
      user: 'Mruiz',
    },
    {
      id: 2,
      date: '02/02/20 14:28pm',
      description: 'Order Completed',
      user: 'Mruiz',
    },
    {
      id: 3,
      date: '02/02/20 14:28pm',
      description: 'Order Completed',
      user: 'Mruiz',
    },
    {
      id: 4,
      date: '02/02/20 14:28pm',
      description: 'Order Completed',
      user: 'Mruiz',
    }

  ];
}
