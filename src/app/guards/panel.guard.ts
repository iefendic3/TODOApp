import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class PanelGuard implements CanActivate, CanLoad {

  constructor(private route: Router, private loginService: LoginService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.loginService.getUserPrivilege.pipe(
        take(1),
        map((getUserPrivilege: boolean) => {
          if(!getUserPrivilege){
            
            return false;
          }
          return true;
        })
      )
    
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this.loginService.getUserPrivilege.pipe(
        take(1),
        map((getUserPrivilege: boolean) => {
          if(!getUserPrivilege){
            
            return false;
          }
          return true;
        })
      )
  }
}
