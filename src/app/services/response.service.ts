import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '../userResponse';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private httpClient: HttpClient) { }

  getUserResponse(){
    this.httpClient.post<UserResponse>('https://dummyjson.com/auth/login',{username: 'kminchelle',
    password: '0lelplR'}).subscribe((data) => console.log(data))
  }
}
