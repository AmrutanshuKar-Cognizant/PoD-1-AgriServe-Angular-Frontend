import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FarmerService } from '../../../../core/services/farmer.service/farmer.service';
import { Document } from '../../../../interfaces/models/models';
 
@Component({
  selector: 'app-document-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './documentdashboard.html',
  styleUrls: ['./documentdashboard.css'],
})
export class DocumentDashboardComponent implements OnInit {
  documents: Document[] = [];
  loading = true;
 
  constructor(private farmerService: FarmerService) {}
 
  ngOnInit(): void {
    this.farmerService.getDocuments().subscribe({
      next: (docs) => {
        this.documents = docs;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
 
  get accepted(): number {
    return this.documents.filter((d) => d.verificationStatus === 'Accepted').length;
  }
 
  get pending(): number {
    return this.documents.filter((d) => d.verificationStatus === 'Pending').length;
  }
 
  get rejected(): number {
    return this.documents.filter((d) => d.verificationStatus === 'Rejected').length;
  }
 
  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Accepted: 'badge-green',
      Pending:  'badge-amber',
      Rejected: 'badge-red',
    };
    return map[status] ?? 'badge-gray';
  }
 
  getDocIcon(docType: string): string {
    const map: Record<string, string> = {
      'Aadhaar Card':         'ti-id-badge',
      'Land Permit (Khasra)': 'ti-map',
      'Bank Passbook':        'ti-building-bank',
      'Crop Insurance':       'ti-shield',
      'Soil Health Card':     'ti-leaf',
      'PAN Card':             'ti-credit-card',
      'Voter ID':             'ti-user-check',
    };
    return map[docType] ?? 'ti-file';
  }
 
  getDocIconBg(docType: string): string {
    const greenTypes = ['Aadhaar Card', 'Land Permit (Khasra)', 'Bank Passbook', 'Voter ID', 'PAN Card'];
    return greenTypes.includes(docType) ? 'icon-blue' : 'icon-amber';
  }
 
  formatDate(date: string | Date): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}