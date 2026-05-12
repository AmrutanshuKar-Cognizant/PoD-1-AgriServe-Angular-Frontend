import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemUser, FarmerDocument } from '../../../models/admin.models';

@Injectable({
  providedIn: 'root' 
})
export class AdminService {

  private baseUrl = 'http://localhost:8081/api'; 

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  
  getAllUsers(): Observable<SystemUser[]> {
    return this.http.get<SystemUser[]>(`${this.baseUrl}/users`, { headers: this.getHeaders() });
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userData);
  }  

  // Deactivate User
  deactivateUser(userId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}/deactivate`, {}, { headers: this.getHeaders() });
  }

  // Delete User
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`, { headers: this.getHeaders() });
  }

  getPendingDocuments(): Observable<FarmerDocument[]> {
    return this.http.get<FarmerDocument[]>(`${this.baseUrl}/farmers/documents/pending`);
  }

  updateDocumentStatus(documentId: number, status: string): Observable<FarmerDocument> {
    // Passes the status as a Query Parameter matching your @RequestParam
    return this.http.patch<FarmerDocument>(`${this.baseUrl}/farmers/documents/${documentId}/status?status=${status}`, {});
  }
}