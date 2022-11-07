import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { TodoDetailsService } from './todo-details.service';
import { UserTask } from './userTask';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TODOComponent implements OnInit {

  

  

  toDoForm = this.fb.group({
    itemTitle: '',
    itemContent: '',
    startDate: new Date(),
    endDate: new Date(),
    duration: 0,
    
  })

  

  tasks: UserTask[] = [{title: 'ibro', content: 'test', startDate: new Date(), endDate: new Date(), duration: 0}];
  completedTasks: UserTask[] = [{title: 'ibro', content: 'test', startDate: new Date(), endDate: new Date(), duration: 0}];
  user!: User ;
  constructor(private userService: UserService, private fb: FormBuilder, private dialog: MatDialog, 
    private detailsService: TodoDetailsService) { 
      
    }

  
  ngOnInit(): void {
    
    this.userService.userSubject.subscribe((data) => {
    this.user = data;
    })
    if(localStorage.getItem('tasks') != null)
    this.tasks = JSON.parse(localStorage.getItem('tasks')!)
    if(localStorage.getItem('completedTasks') != null)
    this.completedTasks = JSON.parse(localStorage.getItem('completedTasks')!)
    

    
  } 

  addTask(){
    const taskTitle = this.toDoForm.value.itemTitle!;
    const taskContent = this.toDoForm.value.itemContent!;
    const taskStartDate = this.toDoForm.value.startDate!;

    this.tasks.push({title: taskTitle, content: taskContent, startDate: taskStartDate, endDate: new Date(), duration: 0})
    localStorage.setItem('tasks',JSON.stringify(this.tasks))
    this.toDoForm.reset();
    
  }

  drop(event: CdkDragDrop<UserTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
      
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
        
      );
      var index = event.currentIndex
      this.completedTasks[index].endDate = new Date();
      var time = this.completedTasks[index].endDate.getTime() - this.completedTasks[index].startDate.getTime()
      var days = time/(1000*3600*24)
      this.completedTasks[index].duration = days
      localStorage.setItem('completedTasks',JSON.stringify(this.completedTasks))
    }
  }
  openDetails(index: number){
    this.dialog.open(TodoDetailsDialog, {
      data: {
        title: this.tasks[index].title,
        content: this.tasks[index].content,
        startDate: this.tasks[index].startDate,
      },

      

      
    });
    
   this.detailsService.getDataTitle().subscribe((data)=>
   {
    if(data!='')
    this.tasks[index].title=data
   })
   this.detailsService.getDataContent().subscribe((data)=>
   {
    if(data!='')
    this.tasks[index].content=data
   })

  }
    openCompletedTask(index: number){
      this.dialog.open(CompletedDetailsDialog, {
        data: {
          title: this.completedTasks[index].title,
          content: this.completedTasks[index].content,
          startDate: this.completedTasks[index].startDate,
          endDate: this.completedTasks[index].endDate,
          duration: this.completedTasks[index].duration,
        },
      });

    
    
  }
  deleteTask(index: number){
    this.tasks.forEach((element, i)=>{
      if(i==index) this.tasks.splice(i,1);
   });
  }
  deleteCompletedTask(index: number){
    this.completedTasks.forEach((element, i)=>{
      if(i==index) this.completedTasks.splice(i,1);
   });
  }


  
  
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'todo-details.component.html',
  
})
export class TodoDetailsDialog {
  constructor(private detailsService: TodoDetailsService, @Inject(MAT_DIALOG_DATA) public data: UserTask) {}

  updateTask(dataTitle: string, dataContent: string){
    this.detailsService.updateTask(dataTitle, dataContent)
  }



  enable: boolean = false;
  
}

@Component({
  selector: 'dialog-content-completed-dialog',
  templateUrl: 'completed-details.component.html',
  
})
export class CompletedDetailsDialog{
  constructor(private detailsService: TodoDetailsService, @Inject(MAT_DIALOG_DATA) public data: UserTask) {}


}

