import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplianceService } from '../../../core/services/compliance/compliance';
import { AuditPayload } from '../../../models/compliance.models';

@Component({
  selector: 'app-auditform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auditform.html'
})
export class AuditformComponent {
  
  auditData: AuditPayload = {
    scope: '',
    findings: '',
    status: 'PENDING'
  };

  isSubmitting = false;

  // 👇 Toast Notification State
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  private toastTimer: any;

  private complianceService = inject(ComplianceService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  onSubmit(): void {
    if (!this.auditData.scope || this.auditData.scope.trim().length === 0) {
      this.showToast('Scope is required!', 'error');
      return;
    }

    this.isSubmitting = true;

    this.complianceService.createAudit(this.auditData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.showToast('Audit created successfully!', 'success');
        
        // Brief delay before navigation so the user can see the success toast
        setTimeout(() => {
          this.router.navigate(['/compliance/audits']);
        }, 1500);
      },
      error: (error) => {
        console.error('🔴 Failed to create audit:', error);
        this.isSubmitting = false;
        this.showToast('Failed to save the audit. Please try again.', 'error');
      }
    });
  }

  // 👇 Helper for non-blocking notifications
  private showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.cdr.detectChanges();

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastMessage = '';
      this.cdr.detectChanges();
    }, 4000);
  }

  cancel(): void {
    this.router.navigate(['/compliance/audits']);
  }
}