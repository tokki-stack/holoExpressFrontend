import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InvoiceService } from 'src/app/service/invoice.service';
import { SettingService } from 'src/app/service/setting.service';

import { result } from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient,
    private invoiceService: InvoiceService,
    private settingService: SettingService,

    
    ) { }

  baseURL = environment.baseURL;


  getOrdersByCustomer(customerID) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseURL + '/orders/getOrdersByCustomer', {customerID: customerID})
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
        .get(this.baseURL + '/orders/getAllOrders')
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
  createNewOrder(order, role){
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseURL + '/orders/createNewOrder', {order, role})
        .subscribe(
          async json => {
            var tempResult;
            tempResult = json;
            var idorders = tempResult.insertId;
            this.orderLog(idorders, '0', window.localStorage.getItem("userID")).then(async temp => {
              await this.invoiceService.checkinvoiceForCustomer(order.idcustomers).then(result=> {
                tempResult = result
                if(tempResult.length == 0){
                  this.settingService.getSettings().then(result => {
                    this.invoiceService.createNewInvoice(order.idcustomers,'0', result[0].itbms).then(result => {
                      tempResult = result
                      this.invoiceService.createNewInvoicedOrder({
                        description: 'Servicio de entrega ' + idorders,
                        price: order.cost,
                      }, tempResult.insertId).then(result => {
                        order['billing'] = tempResult.insertId;
                        order['idorders'] = idorders;
                        this.updateOrder(order).then(result => {
                        })
                      })
                    })
                  })
  
                }
                else {
                  var idinvoice = result[0].idinvoice;
                  this.invoiceService.createNewInvoicedOrder({
                    description: 'Servicio de entrega ' + idorders,
                    price: order.cost,
                  }, result[0].idinvoice).then(result => {
                    order['billing'] = idinvoice;
                    order['idorders'] = idorders;
                    this.updateOrder(order).then(result => {
                    })
                  })
                }
              })
              resolve(json);
            })

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
        .post(this.baseURL + '/orders/updateOrder', {order})
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
        .post(this.baseURL + '/orders/getOrdersBymessengerID', {idmessengers: idmessengers})
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
  getOrderByID(idorders){
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseURL + '/orders/getOrderByID', {idorders: idorders})
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
  editOrderdeliveryCostByID(idorders, deliveryAddress, cost){
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseURL + '/orders/editOrderdeliveryCostByID', {idorders: idorders, deliveryAddress: deliveryAddress, cost})
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
  setOrderStatus(idorders, status, idmessengers){
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseURL + '/orders/setOrderStatus', {idorders: idorders, status: status})
        .subscribe(
          async json => {
            await this.orderLog(idorders, status, idmessengers).then(result => {
            })
            resolve(json);
          },
          error => {
            reject(error);
          }
        );
    });
  }
  assignOrder(idorders, idmessengers){
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseURL + '/orders/assignOrder', {idorders: idorders, idmessengers: idmessengers})
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

  orderLog(idorders, status, idmessengers) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseURL + '/packages/orderLog', { idorders: idorders, status: status , idmessengers: idmessengers})
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

  getOrderLog(idorders) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseURL + '/packages/getOrderLog', { idorders: idorders})
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

  createOrderDetail(idorders, detail, path) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseURL + '/orders/createOrderDetail', { idorders: idorders, detail: detail, path: path})
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
