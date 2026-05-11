import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplianceService } from '../../../core/services/compliance/compliance';
import { AuditPayload } from '../../../models/compliance.models';

@Component({
  selector: 'app-auditform',
  standalone: true,
  imports: [CommonModule, FormsModule], // MUST include FormsModule for ngModel
  templateUrl: './auditform.html'
})
export class AuditformComponent {
  
  // Initialize the empty payload based on your interface
  auditData: AuditPayload = {
    scope: '',
    findings: '',
    status: 'PENDING' // Default status
  };

  isSubmitting = false;

  constructor(
    private complianceService: ComplianceService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.auditData.scope) {
      alert('Scope is required!');
      return;
    }

    this.isSubmitting = true;

    this.complianceService.createAudit(this.auditData).subscribe({
      next: (response) => {
        console.log('✅ Audit created successfully:', response);
        this.isSubmitting = false;
        // Navigate back to the audits table after saving
        this.router.navigate(['/compliance/audits']); 
      },
      error: (error) => {
        console.error('🔴 Failed to create audit:', error);
        alert('Failed to save the audit.');
        this.isSubmitting = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/compliance/audits']);
  }
}