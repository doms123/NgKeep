import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

// Angular Material Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

// Services Imports
import { AuthService } from './services/auth.service';
import { NoteService } from './services/note.service';
import { ProfileService } from './services/profile.service';
import { AuthGuardService } from './services/auth-guard.service';

// Components Imports
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { NavComponent } from './components/nav/nav.component';
import { FormComponent } from './components/form/form.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home/:id', component: HomeComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuardService]},
  {path: 'reminders', component: RemindersComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService]},
  {path: 'confirm-register/:id', component: ConfirmRegistrationComponent},
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
    DeleteDialogComponent,
    ProfileComponent,
    EditDialogComponent,
    ProfileFormComponent,
    ConfirmRegistrationComponent
  ],
  entryComponents: [EditDialogComponent, DeleteDialogComponent, ProfileFormComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [AuthService, NoteService, ProfileService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
