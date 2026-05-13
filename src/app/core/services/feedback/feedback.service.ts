import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FeedbackRequestDTO, FeedbackResponseDTO } from '../../../models/feedback.models';



@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = environment.apiEndpoints.feedback.baseUrl;

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

  submitFeedback(dto: FeedbackRequestDTO): Observable<FeedbackResponseDTO> {
    return this.http.post<FeedbackResponseDTO>(`${this.apiUrl}/submit`, dto, { headers: this.getHeaders() });
  }

  getAllFeedback(): Observable<FeedbackResponseDTO[]> {
    return this.http.get<FeedbackResponseDTO[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }
}