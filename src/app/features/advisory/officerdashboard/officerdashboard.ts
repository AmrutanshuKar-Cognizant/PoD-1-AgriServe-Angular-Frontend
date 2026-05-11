import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SidebarComponent } from '../../../features/shared/sidebar/sidebar';
import { HeaderComponent } from '../../../features/shared/header/header';
import { AdvisoryService } from '../../../core/services/advisory/advisory'; 

@Component({
  selector: 'app-officer-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    SidebarComponent
  ],
  templateUrl: './officerdashboard.html'
})
export class OfficerDashboardComponent implements OnInit, OnDestroy {
  officerName = '';
  workshops: any[] = []; // Array to hold backend workshop data

  isLoading = true;
  errorMessage = '';

  private destroy$ = new Subject<void>();

  constructor(
    private advisoryService: AdvisoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.isLoading = true;
    this.cdr.detectChanges();

    // 1. Fetch Officer details from LocalStorage
    this.officerName = localStorage.getItem('name') || 'Officer';
    
    const currentOfficerId = Number(localStorage.getItem('user_id'));

    // 2. Fetch Assigned Workshops using the dynamic ID
    this.advisoryService.getMyWorkshops(currentOfficerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any[]) => {
          this.workshops = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error('Error fetching workshops:', err);
          this.errorMessage = 'Could not load your assigned workshops.';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}