import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'kt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  name: string;
  user: string;
  email: string;
  type: string;
  status: string;

  constructor(public dialogRef: MatDialogRef<UserDetailComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    console.log(this.data);
    if( this.data.user !=''){
      this.name = this.data?.user.name;
      this.user = this.data?.user.user;
      this.status = this.data?.user.status.toString();
      this.type = this.data?.user.type.toString();
      this.email = this.data?.user.email;
    }
  }

}
