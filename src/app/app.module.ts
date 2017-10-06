import { BrowserModule } from '@angular/platform-browser';

// Angular Material Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatIconModule} from '@angular/material';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// Components Imports
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Services Imports
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

// Firebase Imports
import * as firebase from 'firebase';
import { HomeComponent } from './components/home/home.component';

// Firebase setup
var config = {
  apiKey: "AIzaSyABZHPnKty99P9WTrO3BOl0pw3YTzhY4v0",
  authDomain: "task-4ab6a.firebaseapp.com",
  databaseURL: "https://task-4ab6a.firebaseio.com",
  projectId: "task-4ab6a",
  storageBucket: "task-4ab6a.appspot.com",
  messagingSenderId: "19882332675"
};
firebase.initializeApp(config);

const appRoutes: Routes = [
  {path: 'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path: '', component:LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ToastrModule.forRoot({ 
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
