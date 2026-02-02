import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styles: [`
    .pointer { cursor: pointer; }
    .nav-link.active { background-color: #3d5a80; color: white !important; font-weight: bold; border-radius: 5px; }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}