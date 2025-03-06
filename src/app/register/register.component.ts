import { Component, inject } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginserviceService } from '../services/login/loginservice.service';

import { Router } from '@angular/router';
import { ValidatorService } from '../services/validator.service';



@Component({
  selector: 'app-register',
  imports: [],
  template: `
    <!-- Formulario de Registro -->
    <div class="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 class="text-xl font-bold mb-4">Registro</h2>
      <form>
          <input type="text" placeholder="Nombre" class="w-full border p-2 mb-2 rounded">
          <input type="email" placeholder="Correo electrónico" class="w-full border p-2 mb-2 rounded">
          <input type="password" placeholder="Contraseña" class="w-full border p-2 mb-2 rounded">
          <input type="password" placeholder="Repetir contraseña" class="w-full border p-2 mb-2 rounded">
          <button class="w-full bg-blue-600 text-white p-2 rounded">Registrarse</button>
      </form>
    </div>
  `
})
export class RegisterComponent {

  private authService: LoginserviceService = inject(LoginserviceService);
  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);
  private emailValidatorService = inject(ValidatorService);


  registerForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], [this.emailValidatorService]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.equalFields('password', 'confirmPassword') });


  equalFields(field1: string, field2: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const control1 = form.get(field1);
      const control2 = form.get(field2);

      if (control1?.value !== control2?.value) {
        control2?.setErrors({ nonEquals: true });
        return { nonEquals: true };
      }

      // Si los valores son iguales, eliminamos el error solo si 'nonEquals' estaba presente antes
      if (control2?.hasError('nonEquals')) {
        control2.setErrors(null);
        control2.updateValueAndValidity({ onlySelf: true });
      }

      return null;
    };

  }

  get emailErrorMsg(): string {
    const errors = this.registerForm.get('email')?.errors;
    let errorMsg: string = '';
    if(errors){
      if (errors['required']) {
        errorMsg = 'El email es obligatorio'
      }
      else if(errors['email']){
        errorMsg = 'El email no tiene formato de correo';
      }
      else if(errors['emailTaken']){
        errorMsg = 'El email ya está en uso'
      }
    }
    return errorMsg;
  }


  onSubmit() {
    if (this.registerForm.valid) {
      const { nombre, email, password } = this.registerForm.value;

      this.authService.register({ nombre, email, password }).subscribe({
        next: () => {
          () => this.router.navigate(['/login'])

        },
        error: (error) => {

          console.log(error)

        }
      });
    }
  }
}
