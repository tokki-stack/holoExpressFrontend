import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MessengerService } from 'src/app/service/messenger.service';
import { result } from 'lodash';

@Component({
  selector: 'kt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  name: string;
  user: string;
  email: string;
  role: string;
  status: string;

  title;

  member;
  userForm = new FormGroup({
    name: new FormControl,
    user: new FormControl,
    email: new FormControl,
    role: new FormControl,
    status: new FormControl,
  });



  constructor(
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private messengerService: MessengerService,

  ) { }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      role: ['', Validators.required],
      status: ['', Validators.required],
    });

    if (this.data.user != '') {
      this.userForm.setValue({
        name: this.data?.user.name,
        user: this.data?.user.user,
        status: this.data?.user.status.toString(),
        role: this.data?.user.role.toString(),
        email: this.data?.user.email,
      })
      this.name = this.data?.user.name;
      this.user = this.data?.user.user;
      this.status = this.data?.user.status.toString();
      this.role = this.data?.user.role.toString();
      this.email = this.data?.user.email;
      this.title = "edit";
    }
    else {
      this.title = "new";
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.userForm.invalid) {
      window.alert("Please input all fields correctly!")
    }
    else {
      if (this.title == 'edit') {
        this.member = this.userForm.value;
        this.member.idmessengers = this.data.user.idmessengers;
        this.messengerService.editMember(this.member).then(result => {
          window.alert("successfully saved!")
          this.dialogRef.close();
        })
      }
      else {
        this.messengerService.createNewMember(this.userForm.value).then(result => {
          window.alert("successfully created! The default password of the user is '123'! ")
          this.dialogRef.close();
        })
      }
    }
  }

  delete() {
    if (window.confirm("are you going to really delete this member?")) {
      this.messengerService.deleteMember(this.data.user.idmessengers).then(result => {
        window.alert("successfully deleted!")
        this.dialogRef.close();
      })
    }
  }
}
