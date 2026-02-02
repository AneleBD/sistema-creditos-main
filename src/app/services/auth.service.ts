import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Usuario } from '../models/prestamo.model';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarios: Usuario[] = [];
  private loggedIn = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('usuarios');
      this.usuarios = saved ? JSON.parse(saved) : [{ user: "admin", pass: "1234" }];
    } else {
      this.usuarios = [{ user: "admin", pass: "1234" }];
    }
  }

  registrar(nuevo: Usuario) {
    this.usuarios.push(nuevo);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  }

  login(u: string, p: string): boolean {
    const coincide = this.usuarios.find(usr => usr.user === u && usr.pass === p);
    if (coincide) {
      this.loggedIn = true;
      this.router.navigate(['/registro']);
      return true;
    }
    return false;
  }

  isLoggedIn() { return this.loggedIn; }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}