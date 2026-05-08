import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trainingprograms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainingprograms.html',
  styleUrl: './trainingprograms.css'
})
export class TrainingprogramsComponent {
  trainings = [
    { 
      category: 'Irrigation', 
      title: 'Advanced Drip Irrigation Systems', 
      description: 'Learn to design and maintain efficient drip irrigation setups to reduce water usage by up to 40% while improving crop yield.',
      instructor: 'Dr. Anand Sharma', 
      location: 'AgriServe Training Center, Indore', 
      date: 'Nov 5 - Nov 7, 2023', 
      time: '10:00 AM - 1:00 PM', 
      seatsFilled: 18, 
      totalSeats: 25 
    },
    { 
      category: 'Organic Farming', 
      title: 'Organic Farming Certification Course', 
      description: 'A comprehensive 5-day program covering organic pest control, composting, crop rotation, and certification requirements.',
      instructor: 'Prof. Meena Gupta', 
      location: 'State Agriculture University, Bhopal', 
      date: 'Nov 12 - Nov 16, 2023', 
      time: '9:00 AM - 4:00 PM', 
      seatsFilled: 32, 
      totalSeats: 40 
    },
    { 
      category: 'Soil Science', 
      title: 'Soil Health Management Workshop', 
      description: 'Hands-on training on soil testing, nutrient management, and sustainable fertilization practices for better productivity.',
      instructor: 'Dr. Rajesh Mehta', 
      location: 'Community Hall, Block A, Sanwer', 
      date: 'Nov 20, 2023', 
      time: '10:00 AM - 3:00 PM', 
      seatsFilled: 12, 
      totalSeats: 30 
    }
  ];

  getProgressBarWidth(filled: number, total: number): string {
    return (filled / total * 100) + '%';
  }
}