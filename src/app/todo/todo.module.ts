import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TODORoutingModule } from './todo-routing.module';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CompletedDetailsDialog, TodoDetailsDialog } from './todo.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TodoDetailsDialog,
    CompletedDetailsDialog,
  ],
  imports: [
    CommonModule,
    TODORoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    FlexLayoutModule,
    HttpClientModule,
    
  ]
})
export class TODOModule { }
