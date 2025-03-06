import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListcontactsService } from '../services/list contacts/listcontacts.service';
import { LoginserviceService } from '../services/login/loginservice.service';
import { forkJoin, Observable } from 'rxjs';
import { Contact } from '../interfaces/contact';


@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit{

  contactForm!: FormGroup; //Para las validaciones del formulario
  userId!: string; //Para añadir los contactos al usuario

  constructor(
    private fb: FormBuilder, //Creamos el formBuilder para el formulario reactivo
    private contactService: ListcontactsService,
    private login: LoginserviceService //El servicio de login para poder obtener el Id del usuario
  ) {}

  ngOnInit():void {
    this.contactForm = this.fb.group({
      contacts: this.fb.array([])
    });
    this.userId = this.login.id;
  }

  get contacts() {
    return this.contactForm.get("contacts") as FormArray; //Con esta función obtenemos la lista de nuestro FormGroup para iterarla más adelante
  }

  createContact(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      direccion: ['', [Validators.required]]
    });
  }

  addContact() {
    this.contacts.push(this.createContact());
  }

  
  saveContacts(): void {
    if (this.contactForm.invalid) {
      return;
    }
  
    const requests = this.contacts.controls.map(contactFormGroup => {
      const contactData = {
        userId: this.userId,
        ...contactFormGroup.value
      };
      return this.contactService.addContacts(contactData);
    });
  
    forkJoin(requests).subscribe({
      next: () => {

        this.contactForm.reset();
        this.contacts.clear();
      },
      error: () => {

      }
    });
  }



  remove(index: number) {
    this.contacts.removeAt(index);
  }

}
