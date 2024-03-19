import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ActivitiesComponent } from './activities/activities.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'', redirectTo: '/login', pathMatch: 'full'},
    {path:'activities', component: ActivitiesComponent},
    {path:'activities/create', component: ActivitiesComponent},
    {path:'activities/update/:id', component: ActivitiesComponent},
    {path:'activities/delete/:id', component: ActivitiesComponent},
    {path:'activities/:id', component: ActivitiesComponent},
];
