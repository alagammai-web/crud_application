import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { LandingComponent } from './core/components/landing/landing.component';
import { HomeComponent } from './user/components/home/home.component';
import { UpdateuserComponent } from './user/components/updateuser/updateuser.component';


const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'update', component: UpdateuserComponent},
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: '**', redirectTo: 'landing', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
