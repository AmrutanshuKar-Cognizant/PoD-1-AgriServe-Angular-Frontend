import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, LoginRequest } from '../../../models/auth.models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Replace with your actual Spring Boot backend URL
  private apiUrl = 'http://localhost:8081/auth'; 

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}