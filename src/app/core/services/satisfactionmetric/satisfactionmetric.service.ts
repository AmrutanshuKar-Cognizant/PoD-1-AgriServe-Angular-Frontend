import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SatisfactionMetricRequestDTO, SatisfactionMetricResponseDTO } from '../../../models/feedback.models';

 

 
@Injectable({
  providedIn: 'root'
})
export class SatisfactionMetricService {
 
  private apiUrl = environment.apiEndpoints.satisfactionMetrics.baseUrl;
 
  constructor(private http: HttpClient) { }
 
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('loggedInUserId');
    const role = localStorage.getItem('userRole');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'X-Logged-In-User-Id': userId || '',
      'X-User-Role': role || ''
    });
  }
 
  evaluateProgram(dto: SatisfactionMetricRequestDTO): Observable<SatisfactionMetricResponseDTO> {
    return this.http.post<SatisfactionMetricResponseDTO>(`${this.apiUrl}/evaluate`, dto, { headers: this.getHeaders() });
  }
}
 