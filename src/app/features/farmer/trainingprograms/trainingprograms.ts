import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SidebarComponent } from '../../../features/shared/sidebar/sidebar'; 
import { HeaderComponent } from '../../../features/shared/header/header';
import { FarmerService } from '../../../core/services/farmer/farmer';
import { TrainingProgram } from '../../../models/farmer.models';
 
@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent, HeaderComponent],
  templateUrl: './trainingprograms.html'
})
export class TrainingComponent implements OnInit {
  
  programs: TrainingProgram[] = [];
  loading = true;
  error = false;
 
  constructor(
    private farmerService: FarmerService,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    this.fetchPrograms();
  }

  fetchPrograms(): void {
    this.farmerService.getAllTrainingPrograms().subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.programs = data;
        } else if (data && data.content) {
          this.programs = data.content; 
        } else if (data && data.data) {
          this.programs = data.data;    
        } else {
          this.programs = [];
        }
        
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      error: (err: any) => {
        console.error('❌ Failed to load training programs', err);
        this.error = true;
        this.loading = false;
        this.programs = [];
        this.cdr.detectChanges(); 
      },
    });
  }
 
  // --- UI Formatting Helpers ---

  formatDateRange(start: any, end: any): string {
    if (!start || !end) return 'Dates TBD';
    const s = new Date(start).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const e = new Date(end).toLocaleDateString('en-IN',   { day: 'numeric', month: 'short', year: 'numeric' });
    
    // If it's a one-day program, just show one date
    if (s === e) return s;
    return `${s} – ${e}`;
  }
 
  getStatusClass(status: string): string {
    const safeStatus = status?.toUpperCase() || '';
    if (safeStatus === 'ACTIVE' || safeStatus === 'OPEN') return 'bg-green-50 text-green-700 border-green-200';
    if (safeStatus === 'UPCOMING' || safeStatus === 'SCHEDULED') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (safeStatus === 'COMPLETED') return 'bg-gray-100 text-gray-600 border-gray-200';
    if (safeStatus === 'CANCELLED') return 'bg-red-50 text-red-700 border-red-200';
    
    return 'bg-gray-50 text-gray-700 border-gray-200';
  }
 
  isRegisterDisabled(program: TrainingProgram): boolean {
    const status = program.status?.toUpperCase() || '';
    return status === 'COMPLETED' || status === 'CANCELLED';
  }
 
  getRegisterLabel(program: TrainingProgram): string {
    const status = program.status?.toUpperCase() || '';
    if (status === 'COMPLETED') return 'Completed';
    if (status === 'CANCELLED') return 'Cancelled';
    return 'Register Now';
  }
}