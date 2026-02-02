import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { AuthRegistroComponent } from './components/auth-registro/auth-registro';
import { RegistroComponent } from './components/registro/registro.component';
import { ClientesComponent } from './components/clientes/clientes.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'auth-registro', component: AuthRegistroComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];