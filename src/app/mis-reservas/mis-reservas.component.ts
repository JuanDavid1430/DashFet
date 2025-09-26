import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService, Reserva } from '../reservas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.css'
})
export class MisReservasComponent {
  misReservas: Reserva[] = [];
  fechaActual: string;
  usuarioActual: string = 'Usuario Actual';

  constructor(private reservasService: ReservasService) {
    this.misReservas = this.reservasService.getMisReservas();
    this.fechaActual = new Date().toLocaleDateString('es-ES');
  }

  getStatusIcon(estado: string): string {
    switch (estado) {
      case 'disponible': return 'available';
      case 'ocupado': return 'occupied';
      case 'reservado': return 'reserved';
      default: return 'available';
    }
  }

  async editarReserva(reserva: Reserva): Promise<void> {
    const { value: nuevoNombre } = await Swal.fire({
      title: 'Editar Reserva',
      input: 'text',
      inputLabel: 'Nombre de la reserva',
      inputValue: reserva.nombre,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un nombre para la reserva';
        }
        return null;
      }
    });

    if (nuevoNombre) {
      try {
        this.reservasService.editarReserva(reserva.id, { ...reserva, nombre: nuevoNombre });
        this.misReservas = this.reservasService.getMisReservas();
        
        await Swal.fire({
          title: '¡Reserva actualizada!',
          text: 'La reserva se ha actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#28a745'
        });
      } catch (error) {
        await Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar la reserva',
          icon: 'error',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#dc3545'
        });
      }
    }
  }

  async cancelarReserva(id: number): Promise<void> {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción cancelará tu reserva permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        this.reservasService.eliminarReserva(id);
        this.misReservas = this.reservasService.getMisReservas();
        
        await Swal.fire({
          title: '¡Reserva cancelada!',
          text: 'Tu reserva ha sido cancelada correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#28a745'
        });
      } catch (error) {
        await Swal.fire({
          title: 'Error',
          text: 'No se pudo cancelar la reserva',
          icon: 'error',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#dc3545'
        });
      }
    }
  }
}