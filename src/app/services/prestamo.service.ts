import { Injectable } from '@angular/core';
import { Cliente, Cuota, Prestamo } from '../models/prestamo.model';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private clientes: Cliente[] = [];

  getClientes(): Cliente[] {
    return this.clientes;
  }

  agregarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  calcularCuota(monto: number, tasaAnual: number, meses: number): number {
    const tasaMensual = (tasaAnual / 100) / 12;
    return (monto * tasaMensual * Math.pow(1 + tasaMensual, meses)) / (Math.pow(1 + tasaMensual, meses) - 1);
  }

  generarCronograma(monto: number, tasaAnual: number, meses: number): Cuota[] {
    let saldo = monto;
    const tasaMensual = (tasaAnual / 100) / 12;
    const cuota = this.calcularCuota(monto, tasaAnual, meses);
    const cronograma: Cuota[] = [];

    for (let i = 1; i <= meses; i++) {
      const interes = saldo * tasaMensual;
      const capital = cuota - interes;
      saldo -= capital;

      cronograma.push({
        mes: i,
        cuota: cuota,
        interes: interes,
        capital: capital,
        saldo: saldo < 0 ? 0 : saldo
      });
    }
    return cronograma;
  }
}