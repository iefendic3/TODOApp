import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {
  constructor(private loginService: LoginService, private route: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if(!isLoggedIn){
          this.route.navigate(['/login']);
          return false;
        }
        return true;
      })
    )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.loginService.isLoggedIn.pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if(!isLoggedIn){
            this.route.navigate(['/login']);
            return false;
          }
          return true;
        })
      )
  }
}
