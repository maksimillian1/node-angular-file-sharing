import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./containers/login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { OverlayModule } from "@angular/cdk/overlay";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RegistrationComponent } from "./containers/registration/registration.component";
import { Ng2TelInputModule } from "ng2-tel-input";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    OverlayModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    Ng2TelInputModule,
  ]
})
export class AuthModule { }
