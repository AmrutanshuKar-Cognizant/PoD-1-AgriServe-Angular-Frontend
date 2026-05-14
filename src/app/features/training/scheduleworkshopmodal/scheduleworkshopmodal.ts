import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TrainingService } from '../../../core/services/training/training';
import { WorkshopRequest } from '../../../models/training.models';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-schedule-workshop-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scheduleworkshopmodal.html'
})
export class ScheduleworkshopmodalComponent implements OnInit {
  
  @Input() programId!: number; 
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  private trainingService = inject(TrainingService);
  private http = inject(HttpClient); 

  formData = {
    title: '',
    location: '',
    date: '',
    officerId: null as number | null
  };

  // State variables
  availableOfficers: any[] = [];
  isSubmitting = false;

  ngOnInit(): void {
    this.fetchOfficers();
  }

  // Fetch Officers
  fetchOfficers(): void {
    const role = 'ExtensionOfficer'; 
    const baseUrl = environment.apiEndpoints.auth.baseUrl.replace('/auth', '/api');
    
    this.http.get<any[]>(`${baseUrl}/users/role/${role}`).subscribe({
      next: (data) => {
        this.availableOfficers = data;
      },
      error: (err) => {
        console.error('Failed to load extension officers', err);
      }
    });
  }

  get isFormValid(): boolean {
    return !!this.formData.title && 
           this.formData.title.trim().length >= 3 &&
           !!this.formData.location && 
           !!this.formData.date && 
           !!this.formData.officerId;
  }

  onCancel(): void {
    this.close.emit();
  }

  // Submit Logic
  onSubmit(): void {
    if (!this.isFormValid || !this.programId) return;

    this.isSubmitting = true;

    const requestPayload: WorkshopRequest = {
      programId: this.programId,
      title: this.formData.title,
      officerId: this.formData.officerId!,
      location: this.formData.location,
      date: this.formData.date 
    };

    this.trainingService.scheduleWorkshop(requestPayload).subscribe({
      next: (savedWorkshop) => {
        this.isSubmitting = false;
        this.save.emit(savedWorkshop); 
      },
      error: (err) => {
        console.error('Error scheduling workshop:', err);
        this.isSubmitting = false;
        alert('Failed to schedule workshop. Please try again.');
      }
    });
  }
}