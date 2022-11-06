import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class BackGuard implements CanActivate {

  constructor(private loginService: LoginService, private route: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.loginService.isLoggedIn.pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if(!isLoggedIn){
            // this.route.navigate(['/login']);
            return true;
          }
          return false;
        })
      )
  }
  
}
