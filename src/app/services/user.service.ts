import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new BehaviorSubject<User>({
    id: 0,
      username: '',
      email: '',
      password: '',
      token: '',
      privilege: false
  });

  constructor() { }

  setToken(token: string){
    localStorage.setItem('token',token);
    this.decodeToken(token);
  }

  decodeToken(token: string){
    var jwtHelper = new JwtHelperService()
    var decodedToken = jwtHelper.decodeToken(token)

    var user : User = {
      id: decodedToken['id'],
      username: decodedToken['username'],
      email: decodedToken['email'],
      password: '',
      token: token,
      privilege: false
    }

    if(user.token != '') this.userSubject.next(user);
  }
}
