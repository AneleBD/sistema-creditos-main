import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './auth-registro.html'
})
export class AuthRegistroComponent {
  nuevoUsuario = '';
  nuevaClave = '';

  constructor(private authService: AuthService, private router: Router) {}

  crearCuenta() {
    if (!this.nuevoUsuario || !this.nuevaClave) {
      return alert("Por favor, completa todos los campos");
    }

    const nuevo = { user: this.nuevoUsuario, pass: this.nuevaClave };
    this.authService.registrar(nuevo);
    
    alert("¡Cuenta creada con éxito!");
    this.router.navigate(['/login']);
  }
}