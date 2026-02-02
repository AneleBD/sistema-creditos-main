import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestamoService } from '../../services/prestamo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid py-4" style="background-color: #f8f9fa; min-height: 90vh;">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-dark"><i class="bi bi-plus-circle-fill text-primary"></i> Nueva Solicitud de Crédito</h2>
        <span class="badge bg-white text-dark shadow-sm p-2">Terminal: 001 - BCP</span>
      </div>
      
      <div class="row">
        <div class="col-lg-5">
          <div class="card shadow-lg border-0 mb-4" style="border-radius: 20px;">
            <div class="card-body p-4">
              <h5 class="section-title mb-4">DATOS DEL TITULAR</h5>
              
              <div class="mb-3">
                <label class="form-label fw-bold small text-muted">NOMBRE COMPLETO</label>
                <input [(ngModel)]="nombre" class="form-control custom-input" placeholder="Ej: Juan Pérez">
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-bold small text-muted">DNI</label>
                  <input [(ngModel)]="dni" class="form-control custom-input" placeholder="8 dígitos" maxlength="8">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-bold small text-muted">EDAD</label>
                  <input type="number" [(ngModel)]="edad" class="form-control custom-input" 
                         [class.is-invalid]="edad !== 0 && edad < 18">
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold small text-muted">¿EN QUÉ TRABAJA?</label>
                <input [(ngModel)]="ocupacion" class="form-control custom-input" placeholder="Ej: Empleado, Independiente">
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold small text-muted">GANANCIA MENSUAL (S/.)</label>
                <input type="number" [(ngModel)]="sueldo" (input)="actualizarSimulacion()" class="form-control custom-input">
              </div>

              <h5 class="section-title mb-4 text-success">CONDICIONES DEL PRÉSTAMO</h5>
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label fw-bold small text-muted">MONTO A FINANCIAR (S/.)</label>
                  <input type="number" [(ngModel)]="monto" (input)="actualizarSimulacion()" class="form-control bg-light border-0 fw-bold h4">
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold small text-muted">TASA ANUAL (%)</label>
                  <input type="number" [(ngModel)]="tasa" (input)="actualizarSimulacion()" class="form-control custom-input">
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold small text-muted">PLAZO</label>
                  <select [(ngModel)]="meses" (change)="actualizarSimulacion()" class="form-select custom-input">
                    <option [value]="6">6 Meses</option>
                    <option [value]="12">12 Meses</option>
                    <option [value]="24">24 Meses</option>
                    <option [value]="36">36 Meses</option>
                  </select>
                </div>
              </div>

              <div class="summary-box mt-4 p-3 rounded-3 text-center" 
                   [style.background-color]="(cuotaEstimada > sueldo * 0.4 && sueldo > 0) ? '#f8d7da' : '#e7f0ff'">
                <p class="text-muted mb-1 small uppercase">Cuota Mensual Estimada</p>
                <h2 class="text-primary fw-bold">S/. {{ cuotaEstimada | number:'1.2-2' }}</h2>
                <small *ngIf="sueldo > 0 && cuotaEstimada > sueldo * 0.4" class="text-danger fw-bold">
                  ⚠️ Supera el 40% de ingresos
                </small>
              </div>

              <button (click)="registrar()" class="btn btn-primary btn-lg w-100 mt-4 py-3 shadow border-0 fw-bold">
                GENERAR DESEMBOLSO
              </button>
            </div>
          </div>
        </div>

        <div class="col-lg-7">
          <div class="card shadow-lg border-0" style="border-radius: 20px;">
            <div class="card-header bg-white border-0 p-4">
              <h5 class="mb-0 fw-bold">Cronograma de Pagos</h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive" style="max-height: 500px;">
                <table class="table table-hover align-middle mb-0">
                  <thead class="bg-light text-muted small">
                    <tr>
                      <th class="ps-4">MES</th>
                      <th>CUOTA</th>
                      <th>INTERÉS</th>
                      <th>AMORTIZACIÓN</th>
                      <th class="pe-4 text-end">SALDO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let cuota of previewCronograma">
                      <td class="ps-4 fw-bold text-secondary">{{ cuota.numero }}</td>
                      <td class="fw-bold">S/. {{ cuota.montoCuota | number:'1.2-2' }}</td>
                      <td class="text-danger">S/. {{ cuota.interes | number:'1.2-2' }}</td>
                      <td class="text-success">S/. {{ cuota.capital | number:'1.2-2' }}</td>
                      <td class="pe-4 text-end text-muted font-monospace">S/. {{ cuota.saldoPendiente | number:'1.2-2' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .section-title { font-size: 0.85rem; letter-spacing: 1px; font-weight: 800; border-left: 4px solid #002a5d; padding-left: 10px; }
    .custom-input { border: 2px solid #eee; border-radius: 10px; padding: 10px 15px; }
    .custom-input:focus { border-color: #002a5d; box-shadow: none; }
    .summary-box { border: 1px dashed #002a5d; }
    .btn-primary { background: #002a5d; }
  `]
})
export class RegistroComponent {
  // Inicializamos con valores por defecto para evitar error "possibly null"
  nombre: string = '';
  dni: string = '';
  edad: number = 0;
  ocupacion: string = '';
  sueldo: number = 0;
  
  monto: number = 5000;
  tasa: number = 15;
  meses: number = 12;
  cuotaEstimada: number = 0;
  previewCronograma: any[] = [];

  constructor(private prestamoService: PrestamoService, private router: Router) {
    this.actualizarSimulacion();
  }

  actualizarSimulacion() {
    this.previewCronograma = this.prestamoService.generarCronograma(this.monto, this.tasa, this.meses);
    if (this.previewCronograma.length > 0) {
      this.cuotaEstimada = this.previewCronograma[0].montoCuota;
    }
  }

  registrar() {
    // REGLAS DE NEGOCIO
    if (this.edad < 18) {
      alert('❌ Error: El cliente debe ser mayor de 18 años.');
      return;
    }

    if (this.sueldo > 0 && this.cuotaEstimada > (this.sueldo * 0.4)) {
      alert('🚫 Denegado: La cuota mensual no puede superar el 40% del sueldo.');
      return;
    }

    if (!this.nombre || this.dni.length < 8) {
      alert('⚠️ Verifique nombre y DNI.');
      return;
    }

    const nuevoCliente = {
      nombre: this.nombre,
      dni: this.dni,
      edad: this.edad,
      ocupacion: this.ocupacion,
      sueldo: this.sueldo,
      prestamo: {
        monto: this.monto,
        tasaAnual: this.tasa,
        meses: this.meses,
        cronograma: this.previewCronograma
      }
    };

    this.prestamoService.agregarCliente(nuevoCliente);
    this.router.navigate(['/clientes']);
  }
}