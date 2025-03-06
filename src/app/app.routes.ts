import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListContactsComponent } from './list-contacts/list-contacts.component';

export const routes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    //Esto es para hacer el lazy loading
    {path: 'contacts',loadChildren: () => import("./contact/route").then(r => r.routes)}
];
