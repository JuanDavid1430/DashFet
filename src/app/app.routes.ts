import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ReservasComponent } from './reservas/reservas.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { AdministradorComponent } from './administrador/administrador.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'mis-reservas', component: MisReservasComponent },
  { path: 'administrador', component: AdministradorComponent }
];
