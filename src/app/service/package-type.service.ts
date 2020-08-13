import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackageTypeService {

  constructor(private http: HttpClient) { }

  getAllPackageTypes() {
    return new Promise((resolve, reject) => {
      this.http
        .get('http://198.58.106.89:3000/packageType/getAllPackageTypes')
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
  getPackageTypeByID(idpackageType){
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/packageType/getPackageTypeByID', { idpackageType: idpackageType })
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

  createPackageType(packageType) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/packageType/createPackageType', { packageType })
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

  editPackageType(idpackageType, name) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/packageType/editPackageType', { idpackageType: idpackageType, name: name })
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

  deletePackageType(idpackageType) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/packageType/deletePackageType', { idpackageType: idpackageType })
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
