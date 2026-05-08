import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmerService } from '../../../core/services/farmer.service/farmer.service';
import { AdvisoryContent } from '../../../interfaces/models/models';
 
@Component({
  selector: 'app-advisory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advisorysessions.html',
  styleUrls: ['./advisorysessions.css'],
})
export class AdvisoryComponent implements OnInit {
  advisoryList: AdvisoryContent[] = [];
  loading = true;
  error   = false;
 
  constructor(private farmerService: FarmerService) {}
 
  ngOnInit(): void {
    this.farmerService.getActiveAdvisoryContent().subscribe({
      next: (content) => {
        this.advisoryList = content;
        this.loading      = false;
      },
      error: () => {
        this.error   = true;
        this.loading = false;
      },
    });
  }
 
  formatDate(date: any): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day:   'numeric',
      month: 'long',
      year:  'numeric',
    });
  }
 
  getCategoryClass(category: string): string {
    return `cat-${category.toLowerCase().replace(/[\s&]+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  }
 
  getCategoryIcon(category: string): string {
    const map: Record<string, string> = {
      'Crop Protection':    'ti-shield-check',
      'Water Management':   'ti-droplet',
      'Government Schemes': 'ti-building-community',
      'Soil Health':        'ti-flask',
      'Pest Management':    'ti-bug',
      'Market Advisory':    'ti-trending-up',
    };
    return map[category] ?? 'ti-book';
  }
 
  getThumbBg(category: string): string {
    const map: Record<string, string> = {
      'Crop Protection':    '#E1F5EE',
      'Water Management':   '#E6F1FB',
      'Government Schemes': '#FAEEDA',
      'Soil Health':        '#EAF3DE',
      'Pest Management':    '#FCEBEB',
      'Market Advisory':    '#F3EEFF',
    };
    return map[category] ?? '#F1EFE8';
  }
 
  getThumbColor(category: string): string {
    const map: Record<string, string> = {
      'Crop Protection':    '#085041',
      'Water Management':   '#185FA5',
      'Government Schemes': '#BA7517',
      'Soil Health':        '#3B6B1A',
      'Pest Management':    '#A32D2D',
      'Market Advisory':    '#5B2D9E',
    };
    return map[category] ?? '#5F5E5A';
  }
}