import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FarmerService } from '../../../../core/services/farmer.service/farmer.service';
 
@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './document-upload.html',
  styleUrls: ['./document-upload.css'],
})
export class DocumentUploadComponent {
  farmerId    = 'FRM-2041';
  documentType = '';
  fileUri      = '';
  selectedFile: File | null = null;
  fileError   = '';
  submitting  = false;
  submitted   = false;
 
  documentTypes: string[] = [
    'Aadhaar Card',
    'Land Permit (Khasra)',
    'Bank Passbook',
    'Crop Insurance',
    'Soil Health Card',
    'PAN Card',
    'Voter ID',
    'Other',
  ];
 
  constructor(private farmerService: FarmerService, private router: Router) {}
 
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const maxMB = 10;
      if (file.size > maxMB * 1024 * 1024) {
        this.fileError = `File exceeds ${maxMB}MB limit.`;
        this.selectedFile = null;
        return;
      }
      this.fileError = '';
      this.selectedFile = file;
    }
  }
 
  get fileSizeLabel(): string {
    if (!this.selectedFile) return '';
    const kb = this.selectedFile.size / 1024;
    return kb > 1024
      ? `${(kb / 1024).toFixed(1)} MB`
      : `${Math.round(kb)} KB`;
  }
 
  isValid(): boolean {
    return !!this.documentType && !!this.selectedFile;
  }
 
  onSubmit(): void {
    if (!this.isValid() || this.submitting) return;
 
    this.submitting = true;
 
    this.farmerService
      .uploadDocument({
        docType:  this.documentType,
        fileUri:  this.fileUri,
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          this.submitted  = true;
          setTimeout(() => this.router.navigate(['/documents']), 2000);
        },
        error: () => {
          this.submitting = false;
        },
      });
  }
 
  onCancel(): void {
    this.router.navigate(['/documents']);
  }
}