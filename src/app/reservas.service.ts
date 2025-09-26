import { Injectable } from '@angular/core';

export interface Reserva {
  id: number;
  nombre: string;
  tipo: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private reservas: Reserva[] = [
    { id: 1, nombre: 'Aula 101', tipo: 'Aula', estado: 'Disponible' },
    { id: 2, nombre: 'Lab Computo 1', tipo: 'Laboratorio', estado: 'Ocupado' },
    { id: 3, nombre: 'Auditorio Principal', tipo: 'Auditorio', estado: 'Disponible' }
  ];

  constructor() { }

  getReservas(): Reserva[] {
    return this.reservas;
  }

  reservar(id: number): void {
    const reserva = this.reservas.find(r => r.id === id);
    if (reserva && reserva.estado === 'Disponible') {
      reserva.estado = 'Reservado';
    }
  }

  getMisReservas(): Reserva[] {
    return this.reservas.filter(r => r.estado === 'Reservado');
  }

  agregarReserva(reserva: Omit<Reserva, 'id'>): void {
    const newId = Math.max(...this.reservas.map(r => r.id)) + 1;
    this.reservas.push({ ...reserva, id: newId });
  }

  editarReserva(id: number, cambios: Partial<Reserva>): void {
    const reserva = this.reservas.find(r => r.id === id);
    if (reserva) {
      Object.assign(reserva, cambios);
    }
  }

  eliminarReserva(id: number): void {
    this.reservas = this.reservas.filter(r => r.id !== id);
  }
}