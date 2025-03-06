import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginserviceService } from '../services/login/loginservice.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
  <!-- Barra de navegación -->
    <nav class="bg-blue-600 p-4 text-white flex justify-between">
      <h1 class="text-lg font-bold">Gestión de Contactos</h1>
      <div>

        @if (!this.login.isLoged()) {
          
          <button class="bg-blue-800 px-4 py-2 rounded" [routerLink]="['/register']" routerLinkActive="router-link-active">
            Registrarse
          </button>
          <button class="bg-blue-800 px-4 py-2 rounded" [routerLink]="['/login']" routerLinkActive="router-link-active">Iniciar sesión</button>
        } @else {
          <button class="bg-blue-800 px-4 py-2 rounded" (click)="login.logout()">
            Cerrar Sesión
          </button>
          <button class="bg-blue-800 px-4 py-2 rounded" [routerLink]="['/contacts']" routerLinkActive="router-link-active">
            Contactos
          </button>
        }


       

      </div>
    </nav>
  `
})
export class NavbarComponent {

  login = inject(LoginserviceService);
  


}
