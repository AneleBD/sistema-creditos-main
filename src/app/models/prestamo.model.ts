export interface Cuota {
  numero: number;
  montoCuota: number;
  interes: number;
  capital: number;
  saldoPendiente: number;
}

export interface Prestamo {
  monto: number;
  tasaAnual: number;
  meses: number;
  cronograma: Cuota[];
}

export interface Cliente {
  nombre: string;
  dni: string;
  edad: number;      // <--- ESTO ES LO QUE FALTA
  ocupacion: string; // <--- ESTO ES LO QUE FALTA
  sueldo: number;    // <--- ESTO ES LO QUE FALTA
  fechaRegistro?: Date;
  prestamo: {
    monto: number;
    tasaAnual: number;
    meses: number;
    cronograma: Cuota[];
  };
}