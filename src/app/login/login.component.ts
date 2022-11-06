import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { ResponseService } from '../services/response.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  invalidCredentials: string ='' ;

  form!: FormGroup;

  email: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder, private route: Router,
    private loginService: LoginService,
    private responseService: ResponseService) 
    {
      this.loginService.invalidCredentials.subscribe((errMsg) => {
        this.invalidCredentials = errMsg;
        
      })
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required], 
      password: ['', Validators.required]
    })

    

    // this.loginService.getInvalidCredentials.subscribe((data) => {
    //   this.invalidCredentials = data
    // });

    this.responseService.getUserResponse();
  }



  onSubmit() {
    this.loginService.invalidCredentials.next('');
    if (this.form.valid) {
      this.loginService.Login(this.form.value);
    }
  }
}
