import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {

  isAuthenticated$: Observable<boolean> = new Observable<boolean>;

  userPrivilege$: Observable<boolean> = new Observable<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginService) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.loginService.isLoggedIn;
    this.userPrivilege$ = this.loginService.getUserPrivilege;
  }

  onLogout(){
    this.loginService.Logout();
  }
  

}
