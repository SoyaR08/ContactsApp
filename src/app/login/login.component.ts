import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginserviceService } from '../services/login/loginservice.service';
import { Login } from '../interfaces/login';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
  <!-- Formulario de Inicio de Sesión -->
  <div class="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
    <h2 class="text-xl font-bold mb-4">Iniciar Sesión</h2>
    <form (submit)="submit()">
        <input type="email" placeholder="Correo electrónico" [(ngModel)]="logMail" name="logMail" class="w-full border p-2 mb-2 rounded">
        <input type="password" placeholder="Contraseña" [(ngModel)]="logPass" name="logPass" class="w-full border p-2 mb-2 rounded">
        <button class="w-full bg-blue-600 text-white p-2 rounded">Iniciar sesión</button>
    </form>

    <!-- <p>{{logMail}}, {{logsData.password}}</p> -->

  </div>
  `
})
export class LoginComponent {

  logMail: string = '';
  logPass: string = '';

  
  private services = inject(LoginserviceService);
  
  submit() {
    
    let logsData: Login = {
      email: this.logMail,
      password: this.logPass
    };

    this.services.login(logsData);

  }

}
