import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../../../features/shared/sidebar/sidebar';
import { HeaderComponent } from '../../../features/shared/header/header';
import { Workshop, WorkshopRequest } from '../../../models/training.models';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-edit-workshop-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
  templateUrl: './editworkshopmodal.html'
})
export class EditworkshopmodalComponent implements OnInit {

  @Input() workshop!: Workshop;
  @Output() close = new EventEmitter<void>();
  @Output() save  = new EventEmitter<WorkshopRequest>();

  private http = inject(HttpClient);

  formData: WorkshopRequest = {
    programId: 0, title: '', officerId: 0, location: '', date: ''
  };

  availableOfficers: any[] = [];

  ngOnInit(): void {
    const datePart = this.workshop.date
      ? this.workshop.date.substring(0, 16) 
      : '';

    this.formData = {
      programId: this.workshop.programId,
      title:     this.workshop.title,
      officerId: this.workshop.officerId,
      location:  this.workshop.location,
      date:      datePart
    };

    this.fetchOfficers();
  }

  // Fetch Officers
  fetchOfficers(): void {
    const role = 'ExtensionOfficer';
    const baseUrl = environment.apiEndpoints.auth.baseUrl.replace('/auth', '/api');
    
    this.http.get<any[]>(`${baseUrl}/users/role/${role}`).subscribe({
      next: (data) => this.availableOfficers = data,
      error: (err) => console.error('Failed to load extension officers', err)
    });
  }

  get isFormValid(): boolean {
    return !!this.formData.title &&
           this.formData.title.trim().length >= 3 &&
           !!this.formData.location &&
           !!this.formData.date &&
           !!this.formData.officerId;
  }

  onCancel(): void { this.close.emit(); }
  onSubmit(): void { if (this.isFormValid) this.save.emit(this.formData); }
}