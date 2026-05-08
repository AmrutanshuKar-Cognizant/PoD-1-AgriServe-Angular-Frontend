import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmerService } from '../../../core/services/farmer.service/farmer.service';
import { TrainingProgram } from '../../../interfaces/models/models';
 
@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainingprograms.html',
  styleUrls: ['./trainingprograms.css'],
})
export class TrainingComponent implements OnInit {
  programs: TrainingProgram[] = [];
  loading = true;
  error   = false;
 
  constructor(private farmerService: FarmerService) {}
 
  ngOnInit(): void {
    this.farmerService.getAllTrainingPrograms().subscribe({
      next: (programs) => {
        this.programs = programs;
        this.loading  = false;
      },
      error: () => {
        this.error   = true;
        this.loading = false;
      },
    });
  }
 
  formatDateRange(start: any, end: any): string {
    if (!start || !end) return 'TBD';
    const s = new Date(start).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const e = new Date(end).toLocaleDateString('en-IN',   { day: 'numeric', month: 'short', year: 'numeric' });
    return `${s} – ${e}`;
  }
 
  getProgressPercentage(filled: number, total: number): number {
    if (!total) return 0;
    return Math.round((filled / total) * 100);
  }
 
  getSeatsLeft(filled: number, total: number): number {
    return total - filled;
  }
 
  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'Open':        'badge-green',
      'Upcoming':    'badge-blue',
      'Almost Full': 'badge-amber',
      'Full':        'badge-red',
      'Completed':   'badge-gray',
    };
    return map[status] ?? 'badge-gray';
  }
 
  getCategoryClass(category: string): string {
    return `cat-${category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  }
 
  isRegisterDisabled(program: TrainingProgram): boolean {
    return program.status === 'Full' || program.status === 'Completed';
  }
 
  getRegisterLabel(program: TrainingProgram): string {
    if (program.status === 'Full')      return 'Join Waitlist';
    if (program.status === 'Completed') return 'Completed';
    return 'Register Now';
  }
}