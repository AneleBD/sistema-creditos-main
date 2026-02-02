export interface Cuota {
  mes: number;
  cuota: number;
  interes: number;
  capital: number;
  saldo: number;
}

export interface Prestamo {
  monto: number;
  tasaAnual: number;
  meses: number;
  cronograma: Cuota[];
}

export interface Cliente {
  dni: string;
  nombre: string;
  prestamo: Prestamo;
}

export interface Usuario {
  user: string;
  pass: string;
}