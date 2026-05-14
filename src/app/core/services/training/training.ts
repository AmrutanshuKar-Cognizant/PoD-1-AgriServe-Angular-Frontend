import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { 
  TrainingProgram, 
  TrainingProgramRequest, 
  Workshop, 
  WorkshopRequest, 
  Participation, 
  AttendanceUpdateRequest 
} from '../../../models/training.models';

@Injectable({ providedIn: 'root' })
export class TrainingService {

  private http = inject(HttpClient);

  // Dynamic API URL from environment
  private apiUrl = environment.apiEndpoints.auth.baseUrl.replace('/auth', '/api');

  // Auth Headers
  private getAuthHeaders(): HttpHeaders {
    const userId = localStorage.getItem('user_id') || '';
    const role = localStorage.getItem('user_role') || '';
    
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Logged-In-User-Id': userId,
      'X-User-Role': role.startsWith('ROLE_') ? role : 'ROLE_' + role
    });
  }

  // PROGRAM ENDPOINTS
  getAllPrograms(): Observable<TrainingProgram[]> {
    return this.http.get<TrainingProgram[]>(`${this.apiUrl}/programs`, {
      headers: this.getAuthHeaders()
    });
  }

  getProgramById(programId: number): Observable<TrainingProgram> {
    return this.http.get<TrainingProgram>(`${this.apiUrl}/programs/${programId}`, {
      headers: this.getAuthHeaders()
    });
  }

  createProgram(programData: TrainingProgramRequest): Observable<TrainingProgram> {
    return this.http.post<TrainingProgram>(`${this.apiUrl}/programs`, programData, {
      headers: this.getAuthHeaders()
    });
  }

  updateProgram(programId: number, programData: TrainingProgramRequest): Observable<TrainingProgram> {
    return this.http.put<TrainingProgram>(`${this.apiUrl}/programs/${programId}`, programData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProgram(programId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/programs/${programId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getCompletedPrograms(): Observable<TrainingProgram[]> {
    return this.http.get<TrainingProgram[]>(`${this.apiUrl}/programs/completed`, {
      headers: this.getAuthHeaders()
    });
  }

  // WORKSHOP ENDPOINTS
  getWorkshopById(workshopId: number): Observable<Workshop> {
    return this.http.get<Workshop>(`${this.apiUrl}/workshops/${workshopId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getAllWorkshops(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${this.apiUrl}/workshops`, {
      headers: this.getAuthHeaders()
    });
  }

  getActiveWorkshops(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${this.apiUrl}/workshops/active`, {
      headers: this.getAuthHeaders()
    });
  }

  getWorkshopsByOfficer(officerId: number): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${this.apiUrl}/workshops/officer/${officerId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getWorkshopsByProgram(programId: number): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${this.apiUrl}/workshops/program/${programId}`, {
      headers: this.getAuthHeaders()
    });
  }

  scheduleWorkshop(workshopData: WorkshopRequest): Observable<Workshop> {
    return this.http.post<Workshop>(`${this.apiUrl}/workshops`, workshopData, {
      headers: this.getAuthHeaders()
    });
  }

  updateWorkshop(workshopId: number, workshopData: WorkshopRequest): Observable<Workshop> {
    return this.http.put<Workshop>(`${this.apiUrl}/workshops/${workshopId}`, workshopData, {
      headers: this.getAuthHeaders()
    });
  }

  updateWorkshopStatus(workshopId: number, status: string): Observable<Workshop> {
    return this.http.patch<Workshop>(
      `${this.apiUrl}/workshops/${workshopId}/status?status=${status}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  deleteWorkshop(workshopId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/workshops/${workshopId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // PARTICIPATION ENDPOINTS
  registerForWorkshop(workshopId: number): Observable<Participation> {
    const payload = { workshopId: workshopId };
    return this.http.post<Participation>(`${this.apiUrl}/participations/register`, payload, {
      headers: this.getAuthHeaders()
    });
  }

  getParticipantsForWorkshop(workshopId: number): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.apiUrl}/participations/workshop/${workshopId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getParticipationByFarmer(farmerId: number): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.apiUrl}/participations/farmer/${farmerId}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateSingleAttendance(request: AttendanceUpdateRequest): Observable<Participation> {
    return this.http.put<Participation>(`${this.apiUrl}/participations/attendance`, request, {
      headers: this.getAuthHeaders()
    });
  }

  submitBulkAttendance(updates: AttendanceUpdateRequest[]): Observable<Participation[]> {
    const requests = updates.map(update => this.updateSingleAttendance(update));
    return forkJoin(requests);
  }

 // FARMER DETAILS ENDPOINT 
  getFarmerDetails(farmerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/farmers/${farmerId}`, {
      headers: this.getAuthHeaders()
    });
  }
}