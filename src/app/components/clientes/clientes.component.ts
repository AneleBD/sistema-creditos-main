import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamoService } from '../../services/prestamo.service';
import { Cliente } from '../../models/prestamo.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="mb-4">Cartera de Clientes</h2>
    <div class="card p-4 shadow-sm">
      <table class="table table-hover">
        <thead class="table-dark">
          <tr>
            <th>DNI</th>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let cliente of clientes">
            <td>{{ cliente.dni }}</td>
            <td><strong>{{ cliente.nombre }}</strong></td>
            <td>{{ cliente.prestamo.monto | currency:'S/.':'symbol':'1.2-2' }}</td>
            <td>
              <button class="btn btn-sm btn-primary" (click)="verCronograma(cliente)">
                Ver Cronograma
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal d-block" tabindex="-1" *ngIf="clienteSeleccionado" style="background: rgba(0,0,0,0.5)">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Cronograma: {{ clienteSeleccionado.nombre }}</h5>
            <button type="button" class="btn-close" (click)="cerrarModal()"></button>
          </div>
          <div class="modal-body" style="max-height: 400px; overflow-y: auto;">
            <table class="table table-sm table-striped">
              <thead>
                <tr><th>Mes</th><th>Cuota</th><th>Interés</th><th>Capital</th><th>Saldo</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let fila of clienteSeleccionado.prestamo.cronograma">
                  <td>{{ fila.mes }}</td>
                  <td>{{ fila.cuota | currency:'S/.':'symbol':'1.2-2' }}</td>
                  <td>{{ fila.interes | currency:'S/.':'symbol':'1.2-2' }}</td>
                  <td>{{ fila.capital | currency:'S/.':'symbol':'1.2-2' }}</td>
                  <td>{{ fila.saldo | currency:'S/.':'symbol':'1.2-2' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ClientesComponent {
  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;

  constructor(private prestamoService: PrestamoService) {
    this.clientes = this.prestamoService.getClientes();
  }

  verCronograma(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
  }

  cerrarModal() {
    this.clienteSeleccionado = null;
  }
}