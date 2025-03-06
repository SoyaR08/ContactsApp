import { Component, inject, OnInit } from '@angular/core';
import { ListcontactsService } from '../services/list contacts/listcontacts.service';
import { Contact } from '../interfaces/contact';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-list-contacts',
  imports: [ContactComponent],
  templateUrl: './list-contacts.component.html'
})
export class ListContactsComponent implements OnInit{

 contactManage = inject(ListcontactsService);
 userContacts!: Contact[];

 ngOnInit(): void {
    this.contactManage.getContacts();
 }

}
