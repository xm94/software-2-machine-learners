import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER = "http://localhost:4000";
  constructor(private httpClient: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 

  ping(){
    return this.httpClient.get(`${this.AUTH_SERVER}/ping`);
  }

  pingPut(){
    const options = {headers: {'Content-Type': 'application/json'}};
    const data = {
      "name":"id",
      "otherParameter": "other",
      "_id": "12"
    }
    this.httpClient.post(`${this.AUTH_SERVER}/testPut`, JSON.stringify(data), options);
  }
  
}