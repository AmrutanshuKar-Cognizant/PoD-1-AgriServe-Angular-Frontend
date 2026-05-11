import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplianceService } from '../../../core/services/compliance/compliance';
import { ComplianceRecordDTO } from '../../../models/compliance.models';

@Component({
  selector: 'app-allcompliancerecords', // Adapt this to your actual selector
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './allcompliancerecords.html' // Adapt to your actual HTML file name
})
export class AllcompliancerecordsComponent implements OnInit {
  
  records: ComplianceRecordDTO[] = [];
  isLoading = true;

  constructor(
    private complianceService: ComplianceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRecordsFromBackend();
  }

  loadRecordsFromBackend(): void {
    this.complianceService.getAllComplianceRecords().subscribe({
      next: (data: any) => {
        console.log('🟢 COMPLIANCE RECORDS RECEIVED:', data);

        // Safe extraction wrapper
        if (Array.isArray(data)) {
          this.records = data;
        } else if (data && data.content) {
          this.records = data.content;
        } else if (data && data.data) {
          this.records = data.data;
        } else {
          this.records = data; 
        }

        this.isLoading = false;
        this.cdr.detectChanges(); // Force the UI to draw the data
      },
      error: (error) => {
        console.error('Failed to load compliance records:', error);
        this.isLoading = false;
      }
    });
  }

  // Styles the badge based on the audit result
  getResultBadgeClass(result: string): string {
    const safeResult = result?.toUpperCase();
    if (safeResult === 'COMPLIANT') return 'bg-green-100 text-green-800 border-green-200';
    if (safeResult === 'NON-COMPLIANT' || safeResult === 'NON_COMPLIANT') return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-amber-100 text-amber-800 border-amber-200'; // For "Requires Attention"
  }

  // Helper to clean up Java Enum text (e.g., "TRAINING_PROGRAM" -> "TRAINING PROGRAM")
  formatType(type: string): string {
    if (!type) return 'Unknown';
    return type.replace('_', ' '); 
  }
}