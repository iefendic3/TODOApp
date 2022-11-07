import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class TodoDetailsService {

  dataTitleSubject = new BehaviorSubject<string>('')
  dataContentSubject = new BehaviorSubject<string>('')

  constructor() { }

  updateTask(dataTitle: string, dataContent: string){
    this.dataTitleSubject.next(dataTitle)
    this.dataContentSubject.next(dataContent)
    
  }

  getDataTitle(){
    return this.dataTitleSubject.asObservable();
  }
  
  getDataContent(){
    return this.dataContentSubject.asObservable();
  }
}
