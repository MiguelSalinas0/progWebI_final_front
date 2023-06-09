import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/routes/home/home.component';
import { LoginComponent } from './components/routes/login/login.component';
import { ViewProfileComponent } from './components/routes/view-profile/view-profile.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile/:id',
    component: ViewProfileComponent
  },
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
