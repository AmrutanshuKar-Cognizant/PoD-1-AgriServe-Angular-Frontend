import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  navItems = [
    { label: 'Dashboard',         icon: 'ti-layout-dashboard', path: '/farmerdashboard' },
    { label: 'My Documents',      icon: 'ti-files',            path: '/documents' },
    { label: 'Training Programs', icon: 'ti-school',           path: '/training' },
    { label: 'Advisory Sessions', icon: 'ti-book',             path: '/advisory' },
  ];
}