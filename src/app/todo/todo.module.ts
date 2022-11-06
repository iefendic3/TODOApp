import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TODORoutingModule } from './todo-routing.module';
import { TaskModalComponent } from './task-modal/task-modal.component';


@NgModule({
  declarations: [
    TaskModalComponent
  ],
  imports: [
    CommonModule,
    TODORoutingModule
  ]
})
export class TODOModule { }
