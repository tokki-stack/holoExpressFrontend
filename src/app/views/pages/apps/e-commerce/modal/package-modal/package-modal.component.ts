import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'kt-package-modal',
  templateUrl: './package-modal.component.html',
  styleUrls: ['./package-modal.component.scss']
})
export class PackageModalComponent implements OnInit {
	displayedColumnsLog = ['date','description','user'];
	dataSourceLog: MatTableDataSource<any>;

  constructor(public dialogRef: MatDialogRef<PackageModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    console.log(this.data);
		this.dataSourceLog = new MatTableDataSource(this.logs);
  }
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
