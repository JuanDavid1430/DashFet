import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservasService, Reserva } from '../reservas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  reservas: Reserva[] = [];
  nuevaReserva: Omit<Reserva, 'id'> = { nombre: '', tipo: 'aula', estado: 'disponible' };
  editForm: Reserva | null = null;

  constructor(private reservasService: ReservasService) {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservas = this.reservasService.getReservas();
  }

  getStatusIcon(estado: string): string {
    switch (estado) {
      case 'disponible': return 'available';
      case 'ocupado': return 'occupied';
      case 'reservado': return 'reserved';
      default: return 'available';
    }
  }

  getReservasPorEstado(estado: string): Reserva[] {
    return this.reservas.filter(reserva => reserva.estado === estado);
  }

  async agregarReserva(): Promise<void> {
    if (!this.nuevaReserva.nombre || !this.nuevaReserva.tipo) {
      await Swal.fire({
        title: 'Campos requeridos',
        text: 'Por favor completa todos los campos obligatorios',
        icon: 'warning',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#ffc107'
      });
      return;
    }

    const result = await Swal.fire({
      title: '¿Agregar nueva reserva?',
      text: `Se creará: ${this.nuevaReserva.nombre} (${this.nuevaReserva.tipo})`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d'
    });

    if (result.isConfirmed) {
      try {
        this.reservasService.agregarReserva(this.nuevaReserva);
        this.nuevaReserva = { nombre: '', tipo: 'aula', estado: 'disponible' };
        this.cargarReservas();

        await Swal.fire({
          title: '¡Reserva creada!',
          text: 'La nueva reserva se ha agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#28a745'
        });
      } catch (error) {
        await Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la reserva',
          icon: 'error',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#dc3545'
        });
      }
    }
  }

  editarReserva(reserva: Reserva): void {
    this.editForm = { ...reserva };
  }

  async guardarEdicion(): Promise<void> {
    if (!this.editForm) return;

    if (!this.editForm.nombre || !this.editForm.tipo) {
      await Swal.fire({
        title: 'Campos requeridos',
        text: 'Por favor completa todos los campos obligatorios',
        icon: 'warning',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#ffc107'
      });
      return;
    }

    const result = await Swal.fire({
      title: '¿Guardar cambios?',
      text: 'Se actualizarán los datos de la reserva',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d'
    });

    if (result.isConfirmed) {
      try {
        this.reservasService.editarReserva(this.editForm.id, this.editForm);
        this.editForm = null;
        this.cargarReservas();

        await Swal.fire({
          title: '¡Cambios guardados!',
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

  cancelarEdicion(): void {
    this.editForm = null;
  }

  async eliminarReserva(id: number): Promise<void> {
    const reserva = this.reservas.find(r => r.id === id);
    
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará permanentemente: ${reserva?.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        this.reservasService.eliminarReserva(id);
        this.cargarReservas();
        
        if (this.editForm?.id === id) {
          this.editForm = null;
        }

        await Swal.fire({
          title: '¡Eliminada!',
          text: 'La reserva ha sido eliminada correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#28a745'
        });
      } catch (error) {
        await Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar la reserva',
          icon: 'error',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#dc3545'
        });
      }
    }
  }
}