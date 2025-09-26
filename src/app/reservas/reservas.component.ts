import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService, Reserva } from '../reservas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
  reservas: Reserva[] = [];

  constructor(private reservasService: ReservasService) {
    this.reservas = this.reservasService.getReservas();
  }

  async reservar(reserva: Reserva): Promise<void> {
    const result = await Swal.fire({
      title: '¿Confirmar Reserva?',
      text: `¿Deseas reservar ${reserva.nombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, reservar',
      cancelButtonText: 'Cancelar',
      background: '#ffffff',
      customClass: {
        popup: 'animate__animated animate__fadeInDown'
      }
    });

    if (result.isConfirmed) {
      this.reservasService.reservar(reserva.id);
      
      await Swal.fire({
        title: '¡Reserva Exitosa!',
        text: `${reserva.nombre} ha sido reservado correctamente.`,
        icon: 'success',
        confirmButtonColor: '#28a745',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#ffffff',
        customClass: {
          popup: 'animate__animated animate__fadeInUp'
        }
      });
    }
  }
}