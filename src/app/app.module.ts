import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from 'src/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { PanelComponent } from './panel/panel.component';
import { TODOComponent } from './todo/todo.component';
import { AppRoutingModule } from './app-routing.module';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TODOModule } from './todo/todo.module';
import { PanelModule } from './panel/panel.module';
import { AboutModule } from './about/about.module';
import { HttpClientModule } from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt'
import {GoogleMapsModule} from '@angular/google-maps';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { TaskModalComponent } from './task-modal/task-modal.component'



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    PanelComponent,
    TODOComponent,
    AppNavComponent,
    GooglemapComponent,
    TaskModalComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    TODOModule,
    PanelModule,
    AboutModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        authScheme: 'Bearer'
      },
    }),
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
