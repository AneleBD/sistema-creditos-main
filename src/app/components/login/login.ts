import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  usuario = '';
  clave = '';

  constructor(private authService: AuthService) {}

  entrar() {
    const exito = this.authService.login(this.usuario, this.clave);
    if (!exito) {
      alert("Credenciales incorrectas");
    }
  }
}