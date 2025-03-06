import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Login } from '../../interfaces/login';
import { LoginFailed } from '../../interfaces/login-failed';
import { LoginSuccess, RegisterResponse, User } from '../../interfaces/login-success';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  url: string = "https://user-contacts-mongo.vercel.app/api/";
  failedResponse !: LoginFailed;
  successResponse !: LoginSuccess;
  private userId: string = "";
  private isLogedSignal = signal<boolean>(false);
  private redirect: Router = inject(Router); 


  constructor(private http: HttpClient) {
    let id = localStorage.getItem('userId');
    if(id) {
      this.userId = id;
      this.isLogedSignal.set(true);
    }
  }


  login(log: Login): void {

     this.http.post<LoginSuccess>(`${this.url}auth/login`, log)
     .subscribe({
       next:  response => {
        this.successResponse = response;
        this.userId = this.successResponse.userId;
        localStorage.setItem("userId", this.successResponse.userId);
        this.isLogedSignal.set(true);
        
       },
       error: error => this.failedResponse = error
     })

  }

  logout() {
    this.userId = "";
    this.isLogedSignal.set(false);
    localStorage.removeItem("userId");
  }

  register(userData: User): Observable<RegisterResponse> {
    console.log(userData)
    return this.http.post<any>(`${this.url}/register`, userData);
  }

  get id() {
    return this.userId;
  }

  get isLoged() {
    return this.isLogedSignal.asReadonly();
  }

}
