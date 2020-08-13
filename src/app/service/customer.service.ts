import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,) { }
  getAll() {
    return new Promise((resolve, reject) => {
      this.http
        .get('http://198.58.106.89:3000/customer/getAllCustomers')
        .subscribe(
          json => {
            resolve(json);
          },
          error => {
            reject(error);
          }
        );
    });
  }
  createNew(newCustomer) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/customer/createNew', newCustomer)
        .subscribe(
          json => {
            resolve(json);
          },
          error => {
            reject(error);
          }
        );
    });
  }
  deleteCustomerByID(idcustomers) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/customer/deleteCustomerByID', { idcustomers: idcustomers })
        .subscribe(
          json => {
            resolve(json);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getCustomerByID(idcustomers) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/customer/getCustomerByID', { idcustomers: idcustomers })
        .subscribe(
          json => {
            resolve(json);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  updateStatus(idcustomers, status) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/customer/updateStatus', { idcustomers: idcustomers, status: status })
        .subscribe(
          json => {
            resolve(json);
          },
          error => {
            reject(error);
          }
        );
    });
  }
  updateProfile(idcustomers, customer) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/customer/updateProfile', { idcustomers: idcustomers, customer: customer })
        .subscribe(
          json => {
            resolve(json);
          },
          error => {
            reject(error);
          }
        );
    });
  }
  getCustomerByEmail(authData) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/customer/getCustomerByEmail', { email: authData.email, password: authData.password })
        .subscribe(
          json => {
            resolve(json);
          },
          error => {
            reject(error);
          }
        );
    });
  }
}
