import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackGuard } from './guards/back.guard';
import { LoginGuard } from './guards/login.guard';
import { PanelGuard } from './guards/panel.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [BackGuard] },
  {
    path: 'todo', loadChildren: () =>
      import('./todo/todo.module').then((m) => m.TODOModule),
      canActivate: [LoginGuard],
      canLoad: [LoginGuard],
  },
  {
    path: 'about', loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
      canActivate: [LoginGuard],
      canLoad: [LoginGuard],
  },
  {
    path: 'panel', loadChildren: () =>
      import('./panel/panel.module').then((m) => m.PanelModule),
      canActivate: [PanelGuard],
      canLoad: [PanelGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
