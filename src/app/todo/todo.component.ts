import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { UserTask } from './userTask';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TODOComponent implements OnInit {

  toDoForm = this.fb.group({
    itemTitle: '',
    itemContent: ''
  })

  tasks: UserTask[] = [];
  user!: User ;
  constructor(private userService: UserService, private fb: FormBuilder) { }


  @ViewChild(TaskModalComponent) child!:TaskModalComponent;

  ngOnInit(): void {
    
    this.userService.userSubject.subscribe((data) => {
    this.user = data;
    })
    console.log(this.user);
  } 

  addTask(){
    // const user: User = {this.toDoForm.value.itemTitle, ', new Date(), new Date(), new Date()}
    const taskTitle = this.toDoForm.value.itemTitle;
    const taskContent = this.toDoForm.value.itemContent;
    this.tasks.push({title: taskTitle!, content: taskContent!, startDate: new Date(), endDate: new Date(), duration: new Date()})
    this.toDoForm.reset();
  }
  openDialog(){
    this.child.openDialog();
  }

}
