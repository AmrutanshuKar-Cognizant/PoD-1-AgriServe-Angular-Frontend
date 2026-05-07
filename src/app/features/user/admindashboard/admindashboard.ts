import { Component } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.html',
  styleUrls: ['./admindashboard.css']
})
export class Admindashboard{
  // Skeleton only – no functionality for now

  totalUsers!: number;
  activeUsers!: number;
  inactiveUsers!: number;
}