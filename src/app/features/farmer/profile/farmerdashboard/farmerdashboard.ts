import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FarmerService } from '../../../../core/services/farmer.service/farmer.service';
import { Workshop } from '../../../../interfaces/models/models';
 
@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './farmerdashboard.html',
  styleUrls: ['./farmerdashboard.css'],
})
export class FarmerDashboardComponent implements OnInit {
  farmer: any = {
    farmerId: null,
    name: 'Farmer',
    dob: '',
    gender: '',
    address: '',
    contactInfo: '',
    landSize: 0,
    landUnit: 'Acres',
    cropType: 'N/A',
    primaryCrop: 'N/A',
    status: 'Active',
    harvestDays: 0,
    cultivationStatus: 'Loading...',
  };
 
  workshops: Workshop[] = [];
  loading = true;
 
  constructor(private farmerService: FarmerService) {}
 
  ngOnInit(): void {
    this.farmerService.getFarmer().subscribe({
      next: (farmer) => {
        this.farmer = farmer;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
 
    this.farmerService.getWorkshops().subscribe({
      next: (workshops) => (this.workshops = workshops),
      error: () => (this.workshops = []),
    });
  }
 
  formatDate(date: any): string {
    if (!date) return 'TBD';
    return new Date(date).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
 
  getDay(date: any): string {
    if (!date) return '--';
    return new Date(date).getDate().toString().padStart(2, '0');
  }
 
  getMonth(date: any): string {
    if (!date) return '---';
    return new Date(date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  }
 
  getTime(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
 
  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Registered: 'badge-green',
      Pending:    'badge-amber',
      Open:       'badge-blue',
      Completed:  'badge-gray',
    };
    return map[status] ?? 'badge-gray';
  }
}