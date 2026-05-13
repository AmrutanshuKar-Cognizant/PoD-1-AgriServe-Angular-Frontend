import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 👈 Added ChangeDetectorRef
import { CommonModule, Location } from '@angular/common'; // 👈 Added Location
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../core/services/feedback/feedback.service';
import { FeedbackRequestDTO } from '../../models/feedback.models';

@Component({
  selector: 'app-feedback',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.css'],
})
export class FeedbackComponent implements OnInit {
  feedbackType: 'training' | 'advisory' = 'training';
  
  feedback: FeedbackRequestDTO = {
    farmerId: 0,
    rating: 5,
    comment: '',
    date: new Date().toISOString().split('T')[0]
  };

  isSubmitting = false;
  
  // 👇 Toast Notification State
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  private toastTimer: any;

  constructor(
    public feedbackService: FeedbackService,
    private cdr: ChangeDetectorRef, // 👈 Injected ChangeDetectorRef
    private location: Location      // 👈 Injected Location for "navigate back"
  ) {}

  ngOnInit() {
    // Safely extract the farmer's ID from Session Storage
    const storedFarmerId = sessionStorage.getItem('farmerId');
    if (storedFarmerId) {
      this.feedback.farmerId = parseInt(storedFarmerId, 10);
    }
  }

  onTypeChange(type: 'training' | 'advisory') {
    this.feedbackType = type;
    // Clear out the irrelevant ID when switching types
    this.feedback.programId = type === 'training' ? 0 : undefined;
    this.feedback.sessionId = type === 'advisory' ? 0 : undefined;
  }

  submitFeedback() {
    if (!this.feedback.comment.trim()) {
      this.showToast('Please provide a comment.', 'error');
      return;
    }

    this.isSubmitting = true;
    this.toastMessage = ''; 
    this.cdr.detectChanges(); // 👈 Force UI update for the loading state

    this.feedbackService.submitFeedback(this.feedback).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showToast('Feedback submitted successfully! Redirecting...', 'success');
        this.resetForm();
        
        // 👇 Wait 2 seconds, then navigate back to the previous page
        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      error: (error) => {
        console.error('Failed to submit feedback:', error);
        this.isSubmitting = false;
        this.showToast('Failed to submit feedback. Please try again.', 'error');
      }
    });
  }

  resetForm() {
    // Fetch from Session Storage again when resetting
    const storedFarmerId = sessionStorage.getItem('farmerId');
    
    this.feedback = {
      farmerId: storedFarmerId ? parseInt(storedFarmerId, 10) : 0,
      rating: 5,
      comment: '',
      date: new Date().toISOString().split('T')[0]
    };
    
    // Reset the specific target ID based on the current toggle type
    if (this.feedbackType === 'training') {
        this.feedback.programId = 0;
    } else {
        this.feedback.sessionId = 0;
    }
  }

  getRatingStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  // 👇 Dynamic Toast Helper
  private showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.cdr.detectChanges(); // 👈 Guarantee instant UI render

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    // Auto-hide the popup after 4 seconds (mostly useful for errors, as success navigates away)
    this.toastTimer = setTimeout(() => {
      this.toastMessage = '';
      this.cdr.detectChanges();
    }, 4000);
  }
}