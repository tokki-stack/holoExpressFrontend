import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(private http: HttpClient) { }

  createNewPackage(_package) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/packages/createNewPackage', { _package: _package })
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

  getAllPackages() {
    return new Promise((resolve, reject) => {
      this.http
        .get('http://198.58.106.89:3000/packages/getAllPackages')
        .subscribe(
          async json => {
            await this.getTracking(json)
            resolve(json);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getPackagesByOrderID(idorders) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/packages/getPackagesByOrderID', { idorders: idorders })
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

  getCustomerByorderID(idorders) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/packages/getCustomerByorderID', { idorders: idorders })
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

  getMessengerByorderID(idorders) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/packages/getMessengerByorderID', { idorders: idorders })
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

  updatePackage(_package) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/packages/updatePackage', { _package: _package })
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

  deletePackage(_package) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/packages/deletePackage', { _package: _package })
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

  setPackageStatus(_package, status) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/packages/setPackageStatus', { _package: _package, status: status })
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



  getTracking(json) {
    var i = 0;
    json.map(result => {
      var tempTracking = "H"
      for (var j = 0; j < (6 - json[i].idpackages.toString().length); j++) {
        tempTracking = tempTracking + '0';
      }
      json[i].tracking = tempTracking + json[i].idpackages;
      i++;
    })
  }

}
