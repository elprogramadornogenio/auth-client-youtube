import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms'
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';


import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordComponent } from './pages/password/password.component';
import { MainComponent } from './pages/main/main.component';






@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
  ]
})
export class AuthModule { }
