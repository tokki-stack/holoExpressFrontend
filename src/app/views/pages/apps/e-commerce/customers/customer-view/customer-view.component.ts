import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { conforms } from 'lodash';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'kt-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {
  customer;
  tempCustomer;
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router) { }
  customerID;
  status;
  statusClass;
  tempResult;
  disabledFlag = true; //flag to check if edit 
  // values of ngmodel
  firstName;
  lastName;
  email;
  phone;
  mobile;
  company;
  register;
  address;
  ruc;
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.customer = params;
      console.log(this.customer);
      this.customerID = this.customer.idcustomers;
    });
    if (this.customer.status == '0') {
      this.status = "Active";
      this.statusClass = "status3";
    }
    else {
      this.statusClass = "status2"
      this.status = "InActive";
    }
    this.firstName = this.customer.firstName;
    this.lastName = this.customer.lastName;
    this.email = this.customer.email;
    this.phone = this.customer.phone;
    this.mobile = this.customer.mobile;
    this.company = this.customer.company;
    this.register = this.customer.register;
    this.address = this.customer.address;
    this.ruc = this.customer.ruc;


  }

  back() {
    this.router.navigate(['ecommerce/customers']);
  }
  updateStatus(event) {
    if (confirm("Are you sure to change the status?")) {
      this.status = event.target.innerText;
      if (this.status == "Active") {
        this.statusClass = "status3"
        this.customerService.updateStatus(this.customer.idcustomers, '0').then(result => {
          this.tempResult = result;
          if (this.tempResult.status == 'ok') {
            window.alert("Successfully updated");
            this.customerService.createCustomerLog(window.localStorage.getItem('userID'), this.customer.idcustomers, 'status : inactive --> active').then(result => {
              console.log(result);
              this.ngOnInit();
            })
          }
          else {
            window.alert("Error Occured");
          }
        })
      }
      else {
        this.statusClass = "status2"
        this.customerService.updateStatus(this.customer.idcustomers, '1').then(result => {
          this.tempResult = result;
          if (this.tempResult.status == 'ok') {
            window.alert("Successfully updated");
            this.customerService.createCustomerLog(window.localStorage.getItem('userID'), this.customer.idcustomers, 'status :  active --> inactive').then(result => {
              console.log(result);
              this.ngOnInit();
            })
          }
          else {
            window.alert("Error Occured");
          }
        })
      }
    }
  }
  editProfile() {
    this.disabledFlag = false;
    this.tempCustomer = this.customer;
  }
  updateProfile() {
    this.disabledFlag = true;

    if ((this.tempCustomer.firstName == this.firstName) &&
      (this.tempCustomer.lastName == this.lastName) &&
      (this.tempCustomer.email == this.email) &&
      (this.tempCustomer.phone == this.phone) &&
      (this.tempCustomer.mobile == this.mobile) &&
      (this.tempCustomer.company == this.company) &&
      (this.tempCustomer.register == this.register) &&
      (this.tempCustomer.ruc == this.ruc) &&
      (this.tempCustomer.address == this.address)) {
    }
    else {
      if (confirm("Are you sure to update profile?")) {
        var temp = {
          address: this.address,
          ruc: this.ruc,
          company: this.company,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          mobile: this.mobile,
          phone: this.phone,
          register: this.register,
        }
        this.customerService.updateProfile(this.tempCustomer.idcustomers, temp).then(result => {
          console.log(result);
          this.tempResult = result;
          if (this.tempResult.status == 'ok') {
            window.alert("Successfully Updated!");
            var descriptions = '';
            for(var key of Object.keys(temp)){
              // console.log(key);
              if(this.tempCustomer[key] != temp[key]){
                console.log(key,this.tempCustomer[key], temp[key] );
                descriptions = descriptions  + key + " : " + this.tempCustomer[key] + " --> " +  temp[key] + " | ";
              }
            }
            console.log(descriptions);
            this.customerService.createCustomerLog(window.localStorage.getItem('userID'), this.tempCustomer.idcustomers,descriptions).then(result => {
              console.log(result);
              this.ngOnInit();

            })
          }
          else {
            window.alert("Error occured!")
          }
        })
      }
    }
  }

}
