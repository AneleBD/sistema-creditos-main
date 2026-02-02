import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 sidebar bg-dark text-white min-vh-100 p-3">
          <h4 class="border-bottom pb-3 mb-4">Prestamos BCP</h4>
          <div class="nav flex-column">
            <a routerLink="/registro" routerLinkActive="active" class="nav-link text-white-50 mb-2">
              Nuevo Préstamo
            </a>
            <a routerLink="/clientes" routerLinkActive="active" class="nav-link text-white-50">
              Cartera de Clientes
            </a>
          </div>
        </div>

        <div class="col-md-10 p-4 bg-light">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .nav-link { cursor: pointer; }
    .nav-link.active { background-color: #3d5a80; color: white !important; border-radius: 5px; }
  `]
})
export class AppComponent {}