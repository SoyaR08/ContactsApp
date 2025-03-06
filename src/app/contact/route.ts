import { Routes } from "@angular/router";
import { ListContactsComponent } from "../list-contacts/list-contacts.component";

export const routes: Routes = [
    /**
     * Esto de aquí me redirige a otra ruta indicada más abajo
     */
    { path: '', redirectTo: 'contact', pathMatch: 'full' },
    { path: 'contact', component: ListContactsComponent }
]
