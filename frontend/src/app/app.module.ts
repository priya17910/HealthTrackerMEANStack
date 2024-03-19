import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ActivitiesComponent } from './activities/activities.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        ActivitiesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
    providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
    bootstrap: [AppComponent]
})
export class AppModule { }