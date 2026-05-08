import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'farmerdashboard', // Change default to dashboard
    pathMatch: 'full'
  },
  {
    path: 'farmerdashboard',
    loadComponent: () =>
      import('./features/farmer/profile/farmerdashboard/farmerdashboard')
        .then((m) => m.FarmerDashboardComponent),
  },
  {
    path: '',
    redirectTo: 'documents',
    pathMatch: 'full'
  },
  {
    path: 'documents',
    loadComponent: () =>
      import(
        './features/farmer/documents/documentdashboard/documentdashboard'
      ).then((m) => m.DocumentDashboardComponent),
  },
  {
    path: 'documents/upload',
    loadComponent: () =>
      import(
        './features/farmer/documents/document-upload/document-upload'
      ).then((m) => m.DocumentUploadComponent),
  },
  {
    path: 'training',
    loadComponent: () =>
      import('./features/farmer/trainingprograms/trainingprograms').then(
        (m) => m.TrainingComponent
      ),
  },
  {
    path: 'advisory',
    loadComponent: () =>
      import('./features/farmer/advisorysessions/advisorysessions').then(
        (m) => m.AdvisoryComponent
      ),
  },
 
  {
    path: '**',
    redirectTo: 'farmerdashboard', // Redirect to dashboard for any unknown routes
  },
];