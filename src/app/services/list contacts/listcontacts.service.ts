import { inject, Injectable, signal } from '@angular/core';
import { LoginserviceService } from '../login/loginservice.service';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../../interfaces/contact';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListcontactsService {

  urlBase: string = "http://localhost:3000/api/contactos";
  private login = inject(LoginserviceService);
  userId: string = "";
  private contactsSignal = signal<Contact[]>([])

  constructor(private http: HttpClient) { 
    if (this.login.isLoged()) {
      this.userId = this.login.id;
    }
  }

  getContacts() {

    this.userId = this.login.id;
    if (this.userId) {
      this.http.get<Contact[]>(`${this.urlBase}/${this.userId}`)
      .subscribe({
        next: contacts => this.contactsSignal.set(contacts),
        error: () => alert("Ha ocurrido un error inesperado")
      })
    }

  }

  get Contacts() {
    return this.contactsSignal.asReadonly();
  }

  addContacts(body: Omit<Contact, "id">) {
    this.http.post<Contact>(`${this.urlBase}`, body)
    .pipe(
      tap(contact => this.contactsSignal.set([...this.Contacts(), contact]))
    )
  }
}
