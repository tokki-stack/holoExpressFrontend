import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'kt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	displayedColumns = ['name','action'];
  dataSource: MatTableDataSource<any>;
  dataSourceStates: MatTableDataSource<any>;
	dataSourceAreas: MatTableDataSource<any>;
	displayedColumnsAreas = ['name','basePrice','extraRV','extraRW','status','action'];
  
	displayedColumnsStates = ['name','areas','status','action'];
  constructor() { }

  ngOnInit(): void {
		this.dataSource = new MatTableDataSource(this.packagesCategory);
    this.dataSourceStates = new MatTableDataSource(this.states);
		this.dataSourceAreas = new MatTableDataSource(this.areas);
    

  }
  packagesCategory = [{
    id: 0,
    name: 'box'
  },
  {
    id: 1,
    name: 'envelope'
  },
  {
    id: 2,
    name: 'big box'
  }]
  states =[
    { 
      id: 0,
      name: 'State1',
      areas: 3,
      status: 0,
    },
    { 
      id: 1,
      name: 'State2',
      areas: 13,
      status: 0,
    },
    { 
      id: 0,
      name: 'State3',
      areas: 15,
      status: 0,
    },
  ];
  areas = [
    {
      id: 0,
      name: 'Region 1',
      basePrice: '3.00',
      extraRV: '0.90',
      extraRW: '0.80',
      status: 0,
    },
    {
      id: 1,
      name: 'Region 2',
      basePrice: '3.00',
      extraRV: '0.90',
      extraRW: '0.80',
      status: 0,
    },
    {
      id: 2,
      name: 'Region 3',
      basePrice: '3.00',
      extraRV: '0.90',
      extraRW: '0.80',
      status: 1,
    }
  ]
}
