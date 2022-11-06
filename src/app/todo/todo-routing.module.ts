import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TODOComponent } from './todo.component';

const routes: Routes = [{path: '', component: TODOComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TODORoutingModule { }
