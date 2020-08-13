import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateAreaService {

  constructor(private http: HttpClient) { }

  getAllStates() {
    return new Promise((resolve, reject) => {
      this.http
        .get('http://198.58.106.89:3000/states/getAllStates')
        .subscribe(
          async json => {
            resolve(json);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getStateByID(idstates) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/states/getStateByID', { idstates: idstates })
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

  getAreasByStatesID(idstates) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/states/getAreasByStatesID', { idstates: idstates })
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

  createState(state) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/states/createState', { stateName: state.state, status: state.stateStatus })
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

  editState(idstates, name, status) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/states/editState', { idstates: idstates, name: name, status: status })
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

  createArea(area) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/states/createArea', { name: area.area, idstates: area.state, basePrice: area.basePrice, extraRV: area.extraRV, extraRW: area.extraRW, status: area.areaStatus })
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

  editArea(area) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/states/editArea', { area: area })
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
