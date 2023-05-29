import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/auth/register/register.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/register',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
