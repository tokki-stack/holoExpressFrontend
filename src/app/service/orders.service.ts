import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  getOrdersByCustomer(customerID) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/orders/getOrdersByCustomer', {customerID: customerID})
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
  getAllOrders(){
    return new Promise((resolve, reject) => {
      this.http
        .get('http://198.58.106.89:3000/orders/getAllOrders')
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
  createNewOrder(order){
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/orders/createNewOrder', {order})
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
  updateOrder(order){
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/orders/updateOrder', {order})
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
  getOrdersBymessengerID(idmessengers){
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/orders/getOrdersBymessengerID', {idmessengers: idmessengers})
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
  editOrderdeliveryByID(idorders, deliveryAddress){
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/orders/editOrderdeliveryByID', {idorders: idorders, deliveryAddress: deliveryAddress})
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
  setOrderStatus(idorders, status){
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/orders/setOrderStatus', {idorders: idorders, status: status})
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
