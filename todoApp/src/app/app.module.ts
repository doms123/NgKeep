import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Angular Material Imports
// Angular Material Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material';
import {MatGridListModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { NavComponent } from './components/nav/nav.component';
import { FormComponent } from './components/form/form.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'reminders', component: RemindersComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RemindersComponent,
    NavComponent,
    FormComponent,
    DeleteDialogComponent
  ],
  entryComponents: [FormComponent, DeleteDialogComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
