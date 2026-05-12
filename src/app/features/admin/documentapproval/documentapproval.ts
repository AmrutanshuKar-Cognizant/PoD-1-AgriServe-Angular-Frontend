import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../features/shared/sidebar/sidebar';
import { HeaderComponent } from '../../../features/shared/header/header';
import { AdminService } from '../../../core/services/admin/admin';
import { FarmerDocument } from '../../../models/admin.models';

@Component({
  selector: 'app-documentapproval',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './documentapproval.html'
})
export class DocumentapprovalComponent implements OnInit {
  
  pendingDocuments: FarmerDocument[] = [];
  isLoading = true;
  processingId: number | null = null;

  // Toast Notification State
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  private toastTimer: any;

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPendingDocuments();
  }

  loadPendingDocuments(): void {
    this.isLoading = true;
    this.adminService.getPendingDocuments().subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.pendingDocuments = data;
        } else if (data && data.content) {
          this.pendingDocuments = data.content;
        } else if (data && data.data) {
          this.pendingDocuments = data.data;
        } else {
          this.pendingDocuments = [];
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load pending documents:', err);
        this.showToast('Failed to load documents from server.', 'error');
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateStatus(documentId: number, status: string): void {
    if (!documentId) return;

    this.processingId = documentId;
    this.cdr.detectChanges();

    this.adminService.updateDocumentStatus(documentId, status).subscribe({
      next: () => {
        this.showToast(`Document ${status.toLowerCase()} successfully!`, 'success');
        
        // Remove the processed document from the UI without reloading the whole list
        this.pendingDocuments = this.pendingDocuments.filter(doc => doc.documentId !== documentId);
        
        this.processingId = null;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(`Failed to update document status to ${status}:`, err);
        this.showToast(`Failed to update document status.`, 'error');
        this.processingId = null;
        this.cdr.detectChanges();
      }
    });
  }

  viewDocument(fileUri: string | undefined): void {
    if (fileUri) {
      window.open(fileUri, '_blank');
    } else {
      this.showToast('No file attached to this document record.', 'error');
    }
  }

  // --- Helpers ---

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

  formatDocType(type: string | null | undefined): string {
    if (!type) return 'Unknown Document';
    return type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
}