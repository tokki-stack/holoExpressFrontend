import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(private http: HttpClient) { }
  getMessengerByID(idmessengers) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/messengers/getMessengerByID', { idmessengers: idmessengers })
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

  getMessengerByEmail(authData) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/messengers/getMessengerByEmail', { email: authData.email, password: authData.password })
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

  getAllMembers() {
    return new Promise((resolve, reject) => {
      this.http
        .get('http://198.58.106.89:3000/messengers/getAllMembers')
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

  createNewMember(user) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/messengers/createNewMember', user)
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

  editMember(user) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/messengers/editMember', user)
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

  deleteMember(idmessengers) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://198.58.106.89:3000/messengers/deleteMember', { idmessengers: idmessengers })
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
