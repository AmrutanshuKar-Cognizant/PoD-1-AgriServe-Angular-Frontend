import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Farmer,
  Workshop,
  Document,
  TrainingProgram,
  AdvisoryContent,
} from '../../../interfaces/models/models';
 
@Injectable({ providedIn: 'root' })
export class FarmerService {
  private baseUrl = 'http://localhost:8090/api';
 
//  mock data
 
  private mockFarmer: any = {
    farmerId: 2041,
    name: 'Ramesh Subramaniam',
    dob: '1978-03-14',
    gender: 'Male',
    address: 'No. 12, Kaveri Nagar, Pollachi, Coimbatore – 642001',
    contactInfo: '+91 94433 XXXXX',
    landSize: 4.5,
    landUnit: 'Acres',
    cropType: 'Rice (Paddy)',
    status: 'Active',
    primaryCrop: 'Rice',
    harvestDays: 42,
    cultivationStatus: 'Actively cultivating',
  };
 
  private mockWorkshops: Workshop[] = [
    {
      workshopId: 1,
      programId: 101,
      programTitle: 'Soil Health & Fertilizer Management',
      location: 'Krishi Vigyan Kendra, Coimbatore',
      date: '2024-06-15T09:00:00',
      status: 'Registered',
      description: 'Learn modern fertilizer management strategies.',
    },
    {
      workshopId: 2,
      programId: 102,
      programTitle: 'Drip Irrigation Techniques',
      location: 'Tamil Nadu Agricultural University',
      date: '2024-06-22T10:30:00',
      status: 'Pending',
      description: 'Hands-on session on drip and sprinkler systems.',
    },
    {
      workshopId: 3,
      programId: 103,
      programTitle: 'Crop Insurance Awareness Camp',
      location: 'District Agriculture Office, Tiruppur',
      date: '2024-07-08T11:00:00',
      status: 'Open',
      description: 'Understanding PM Fasal Bima Yojana and state schemes.',
    },
  ];
 
  private mockDocuments: Document[] = [
    {
      documentId: 81,
      docType: 'Aadhaar Card',
      fileURI: '/docs/aadhaar.pdf',
      uploadedDate: '2024-01-12',
      verificationStatus: 'Accepted',
      farmerId: 2041,
    },
    {
      documentId: 82,
      docType: 'Land Permit (Khasra)',
      fileURI: '/docs/khasra.pdf',
      uploadedDate: '2024-01-14',
      verificationStatus: 'Accepted',
      farmerId: 2041,
    },
    {
      documentId: 83,
      docType: 'Bank Passbook',
      fileURI: '/docs/passbook.pdf',
      uploadedDate: '2024-01-15',
      verificationStatus: 'Accepted',
      farmerId: 2041,
    },
    {
      documentId: 94,
      docType: 'Crop Insurance',
      fileURI: '/docs/insurance.pdf',
      uploadedDate: '2024-05-02',
      verificationStatus: 'Pending',
      farmerId: 2041,
    },
    {
      documentId: 95,
      docType: 'Soil Health Card',
      fileURI: '/docs/soilcard.pdf',
      uploadedDate: '2024-05-05',
      verificationStatus: 'Pending',
      farmerId: 2041,
    },
  ];
 
  private mockTraining: TrainingProgram[] = [
    {
      programId: 201,
      title: 'Advanced Paddy Cultivation Techniques',
      description:
        'Learn modern SRI (System of Rice Intensification) methods to increase yield by up to 40% with less water usage.',
      startDate: '2024-06-20',
      endDate: '2024-06-22',
      status: 'Open',
      managerId: 1,
      category: 'Crop Management',
      instructor: 'Dr. K. Murugesan',
      location: 'Coimbatore',
      time: '9:00 AM',
      seatsTotal: 50,
      seatsFilled: 36,
    },
    {
      programId: 202,
      title: 'Drip & Sprinkler Irrigation Systems',
      description:
        'Hands-on training on installation, maintenance, and cost-benefit analysis of modern irrigation systems.',
      startDate: '2024-07-01',
      endDate: '2024-07-03',
      status: 'Upcoming',
      managerId: 2,
      category: 'Water Management',
      instructor: 'Er. Priya Nair',
      location: 'Tiruppur',
      time: '10:00 AM',
      seatsTotal: 50,
      seatsFilled: 24,
    },
    {
      programId: 203,
      title: 'Organic Farming & Certification Process',
      description:
        'Complete pathway from converting conventional farmland to certified organic — composting, pest management, and export readiness.',
      startDate: '2024-07-15',
      endDate: '2024-07-18',
      status: 'Almost Full',
      managerId: 3,
      category: 'Organic Farming',
      instructor: 'Ms. Saranya Devi',
      location: 'Erode',
      time: '9:30 AM',
      seatsTotal: 50,
      seatsFilled: 44,
    },
  ];
 
  private mockAdvisory: AdvisoryContent[] = [
    {
      contentId: 1,
      title: 'Managing Kharif Crop Diseases in Tamil Nadu',
      category: 'Crop Protection',
      description:
        'Comprehensive guide covering paddy blast, brown plant hopper, and sheath blight with recommended fungicide schedules and resistant variety selection for 2024 season.',
      fileUri: '/advisory/kharif-diseases.pdf',
      status: 'Active',
      pages: 14,
      publishedDate: '2024-04-10',
    },
    {
      contentId: 2,
      title: 'Water Conservation Techniques for Small Holdings',
      category: 'Water Management',
      description:
        'Practical advisory for farmers with 1–5 acre land covering rainwater harvesting, farm ponds, mulching, and alternate wetting-drying (AWD) method for paddy.',
      fileUri: '/advisory/water-conservation.pdf',
      status: 'Active',
      pages: 9,
      publishedDate: '2024-03-22',
    },
    {
      contentId: 3,
      title: 'PM-KISAN & State Subsidy Eligibility Guide 2024',
      category: 'Government Schemes',
      description:
        'Step-by-step walkthrough of central and state government schemes — eligibility criteria, required documents, application portals, and helpdesk contacts for TN farmers.',
      fileUri: '/advisory/pm-kisan-guide.pdf',
      status: 'Active',
      pages: 22,
      publishedDate: '2024-02-01',
    },
    {
      contentId: 4,
      title: 'Soil Testing & Micronutrient Management',
      category: 'Soil Health',
      description:
        'Understanding your soil test report, interpreting NPK values, and customising fertilizer inputs based on Soil Health Card recommendations.',
      fileUri: '/advisory/soil-testing.pdf',
      status: 'Active',
      pages: 18,
      publishedDate: '2024-01-14',
    },
  ];
 
  // ─────────────────────────────────────────────────────────────────────────
 
  constructor(private http: HttpClient) {}
 
  getFarmer(): Observable<Farmer> {
    // Try backend first; fall back to mock if unavailable
    return this.http
      .get<Farmer>(`${this.baseUrl}/farmer/profile`)
      .pipe(
        map((res) => res ?? this.mockFarmer),
        catchError(() => of(this.mockFarmer))
      );
  }
 
  getWorkshops(): Observable<Workshop[]> {
    return this.http
      .get<Workshop[]>(`${this.baseUrl}/farmer/workshops`)
      .pipe(
        map((res) => (Array.isArray(res) && res.length ? res : this.mockWorkshops)),
        catchError(() => of(this.mockWorkshops))
      );
  }
 
  getDocuments(): Observable<Document[]> {
    return this.http
      .get<Document[]>(`${this.baseUrl}/farmer/documents`)
      .pipe(catchError(() => of(this.mockDocuments)));
  }
 
  uploadDocument(payload: { docType: string; fileUri: string }): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/farmer/documents/upload`, payload)
      .pipe(catchError(() => of({ success: true })));
  }
 
  getAllTrainingPrograms(): Observable<TrainingProgram[]> {
    return this.http
      .get<TrainingProgram[]>(`${this.baseUrl}/training/programs`)
      .pipe(catchError(() => of(this.mockTraining)));
  }
 
  getActiveAdvisoryContent(): Observable<AdvisoryContent[]> {
    return this.http
      .get<AdvisoryContent[]>(`${this.baseUrl}/advisory/active`)
      .pipe(catchError(() => of(this.mockAdvisory)));
  }
}