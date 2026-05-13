import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  ComplianceRecordPayload, 
  ComplianceRecordDTO, 
  TrainingProgramDTO, 
  AdvisorySessionDTO, 
  AuditPayload,
  AuditDTO 
} from '../../../models/compliance.models';


@Injectable({ providedIn: 'root' })
export class ComplianceService {
  
  private baseUrl = 'http://localhost:8081/api'; 

  constructor(private http: HttpClient) {}

  // POST: Submit a new compliance record
  submitRecord(payload: ComplianceRecordPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/compliance-records`, payload);
  }

  // GET: Fetch Training Programs
  getTrainingPrograms(): Observable<TrainingProgramDTO[]> {
    return this.http.get<TrainingProgramDTO[]>('http://localhost:8081/api/programs');
  }

  // GET: Fetch Advisory Sessions
  getAdvisorySessions(): Observable<AdvisorySessionDTO[]> {
    return this.http.get<AdvisorySessionDTO[]>('http://localhost:8081/api/advisory-sessions');
  }

  // GET: Fetch Audits
  getAudits(): Observable<AuditDTO[]> {
    return this.http.get<AuditDTO[]>('http://localhost:8081/api/audits');
  }

  // GET: Fetch Compliance Records
  getAllComplianceRecords(): Observable<ComplianceRecordDTO[]> {
    return this.http.get<ComplianceRecordDTO[]>(`${this.baseUrl}/compliance-records`);
  }

  // POST: Submit a new Audit
  createAudit(payload: AuditPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/audits`, payload); 
  }

  // GET: Fetch Audits
  getAllAudits(): Observable<AuditDTO[]> {
    return this.http.get<AuditDTO[]>(`${this.baseUrl}/audits`);
  }

  updateAudit(auditId: number, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/audits/${auditId}`, payload);
  }
}