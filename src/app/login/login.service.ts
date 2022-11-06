import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { UserResponse } from '../userResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  invalidCredentials = new BehaviorSubject<string>('');

  private loggedIn = new BehaviorSubject<boolean>(false);

  private user: User = {
    id: 0,
      username: '',
      email: '',
      password: '',
      token: '',
      privilege: false
  };

  private userPrivilege = new BehaviorSubject<boolean>(false);

  get getInvalidCredentials(){
    return this.invalidCredentials.asObservable();
  }

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  get getUserPrivilege(){
    return this.userPrivilege.asObservable();
  }
  

  constructor(private router: Router,private userService: UserService, private httpClient: HttpClient) { }

  Login(user: User){
    this.httpClient.post<UserResponse>('https://dummyjson.com/auth/login',{username: user.email, password: user.password}).subscribe(
      (data) => {
        console.log(data)
        this.userService.setToken(data.token)
        this.loggedIn.next(true);
        if(data.token){
          this.router.navigate(['/todo'])
        }
      }, (err: HttpErrorResponse) => {
        this.invalidCredentials.next(err.error.message);

      }
      
    )

  }

  Logout() {                         
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
