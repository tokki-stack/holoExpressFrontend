import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StateAreaService } from 'src/app/service/state-area.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPricingComponent } from './edit-pricing/edit-pricing.component';
import { EditAreaComponent } from './edit-area/edit-area.component';

@Component({
  selector: 'kt-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  dataSourceAreas: MatTableDataSource<any>;
  dataSourceStates: MatTableDataSource<any>;

  displayedColumnsStates = ['name', 'areas', 'status', 'action'];
  displayedColumnsAreas = ['name', 'basePrice', 'extraRV', 'extraRW', 'status', 'action'];

  states;
  areas;
  tempAreas;
  constructor(
    private stateAreaService: StateAreaService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.stateAreaService.getAllStates().then(states => {
      this.states = states;
      this.stateAreaService.getAreasByStatesID(this.states[0].idstates).then(areas => {
        this.areas = areas;
        this.states.map(state => {
          this.stateAreaService.getAreasByStatesID(state.idstates).then(areas => {
            this.tempAreas = areas;
            state.areasNum = this.tempAreas.length;
            this.dataSourceStates = new MatTableDataSource(this.states);
            this.dataSourceAreas = new MatTableDataSource(this.areas);
          })
        });
      })
    })
  }

  stateChange(state) {
    this.stateAreaService.getAreasByStatesID(state.idstates).then(areas => {
      this.areas = areas;
      this.dataSourceAreas = new MatTableDataSource(this.areas);
      this.changeDetectorRefs.detectChanges();

    })
  }

  addState() {
    const dialogRef = this.dialog.open(EditPricingComponent, { data: { dialog: "addState" } });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
  editState(state) {
    const dialogRef = this.dialog.open(EditPricingComponent, { data: { dialog: "editState", state: state } });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
  addArea() {
    const dialogRef = this.dialog.open(EditAreaComponent, { data: { dialog: "addArea" } });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
  editArea(area) {
    const dialogRef = this.dialog.open(EditAreaComponent, { data: { dialog: "editArea", area: area } });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
