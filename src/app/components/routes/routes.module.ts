import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [HomeComponent, LoginComponent, ViewProfileComponent, RegisterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule, MatTabsModule, MatSnackBarModule],
  exports: [HomeComponent, LoginComponent, ViewProfileComponent, RegisterComponent]
})
export class RoutesModule { }
