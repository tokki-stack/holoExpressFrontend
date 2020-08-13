import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StateAreaService } from 'src/app/service/state-area.service';

@Component({
  selector: 'kt-edit-area',
  templateUrl: './edit-area.component.html',
  styleUrls: ['./edit-area.component.scss']
})
export class EditAreaComponent implements OnInit {

  areaForm = new FormGroup({
    state: new FormControl,
    area: new FormControl,
    basePrice: new FormControl,
    extraRV: new FormControl,
    extraRW: new FormControl,
    areaStatus: new FormControl,
  });

  states: any = [];
  editState;

  constructor(
    public dialogRef: MatDialogRef<EditAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private stateAreaService: StateAreaService,

  ) { }

  ngOnInit(): void {

    if (this.data.dialog == 'addArea') {
      this.areaForm = this.fb.group({
        state: ['', Validators.required],
        area: ['', Validators.required],
        basePrice: ['', Validators.required],
        extraRV: ['', Validators.required],
        extraRW: ['', Validators.required],
        areaStatus: ['', Validators.required],
      });
      this.stateAreaService.getAllStates().then(states => {
        this.states = states;
        this.states.map(state => {
          state.idstates = state.idstates.toString();
        })
      })
    }
    else {
      this.areaForm = this.fb.group({
        area: ['', Validators.required],
        basePrice: ['', Validators.required],
        extraRV: ['', Validators.required],
        extraRW: ['', Validators.required],
        areaStatus: ['', Validators.required],
      });
      this.stateAreaService.getStateByID(this.data.area.idstates).then(state => {
        this.editState = state[0].name
      })
      this.areaForm.setValue({ area: this.data.area.name, areaStatus: this.data.area.status, basePrice: this.data.area.basePrice, extraRV: this.data.area.extraRV, extraRW: this.data.area.extraRW });

    }

  }

  addArea() {
    if (this.areaForm.invalid) {
      window.alert("Please input all field correctly!")
    }
    else {
      this.stateAreaService.createArea(this.areaForm.value).then(result => {
        window.alert("successfully saved!");
        this.dialogRef.close();
      })
    }
  }

  editArea() {
    if (this.areaForm.invalid) {
      window.alert("Please input all field correctly!")
    }
    else {
      var area = this.areaForm.value;
      area.idareas = this.data.area.idareas;
      this.stateAreaService.editArea(area).then(result => {
        window.alert("successfully saved!");
        this.dialogRef.close();
      })
    }
  }
}
