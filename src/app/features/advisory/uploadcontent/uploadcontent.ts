import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 👈 Imported ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AdvisoryService } from '../../../core/services/advisory/advisory';
import { SidebarComponent } from '../../shared/sidebar/sidebar';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-upload-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SidebarComponent, HeaderComponent],
  templateUrl: './uploadcontent.html'
})
export class ContentUploadComponent implements OnInit {
  uploadForm!: FormGroup;
  isSubmitting = false;

  // 👇 Toast Notification State
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  private toastTimer: any;

  constructor(
    private fb: FormBuilder,
    private advisoryService: AdvisoryService,
    private router: Router,
    private cdr: ChangeDetectorRef // 👈 Injected ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['Crop Advisory', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      fileUri: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  get f() { return this.uploadForm.controls; }

  onUpload(): void {
    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.toastMessage = ''; // Clear previous messages
    this.cdr.detectChanges(); // Force UI update

    this.advisoryService.createContent(this.uploadForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showToast('Content uploaded successfully! Redirecting...', 'success');
        
        // Navigate away after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/officer/advisory/content']);
        }, 2000);
      },
      error: (err) => {
        console.error('Upload error:', err);
        this.isSubmitting = false;
        this.showToast('Failed to upload content. Please try again.', 'error');
      }
    });
  }

  // 👇 Dynamic Toast Helper
  private showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.cdr.detectChanges(); // 👈 Guarantee instant UI render

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    // Auto-hide the popup after 4 seconds (mostly useful for errors)
    this.toastTimer = setTimeout(() => {
      this.toastMessage = '';
      this.cdr.detectChanges();
    }, 4000);
  }
}