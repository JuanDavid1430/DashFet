import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservasService } from '../reservas.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  totalReservas: number = 0;
  disponibles: number = 0;
  reservados: number = 0;

  constructor(private reservasService: ReservasService) {}

  ngOnInit(): void {
    const reservas = this.reservasService.getReservas();
    this.totalReservas = reservas.length;
    this.disponibles = reservas.filter(r => r.estado === 'Disponible').length;
    this.reservados = reservas.filter(r => r.estado === 'Reservado').length;
  }
}