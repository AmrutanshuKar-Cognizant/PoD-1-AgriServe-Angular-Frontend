import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

// EAGERLY LOADED 
import { LoginComponent } from './features/auth/login/login'; 
import { RegisterComponent } from './features/auth/register/register';
import { Home } from './features/home/home';

export const routes: Routes = [
  // Home page
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home},

  // Login and Register
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // LAZY LOADED COMPONENTS 

  // Profile
  { 
    path: 'profile', 
    loadComponent: () => import('./features/shared/profile/profile').then(c => c.ProfileComponent), 
    canActivate: [authGuard] 
  },
  
  // Compliance Officer and Auditor
  { 
    path: 'compliancedashboard', 
    loadComponent: () => import('./features/compliance/compliancedashboard/compliancedashboard').then(c => c.ComplianceDashboardComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['COMPLIANCEOFFICER', 'AUDITOR']} 
  },
  { 
    path: 'compliance/records', 
    loadComponent: () => import('./features/compliance/compliancerecordnavbar/compliancerecordnavbar').then(c => c.CompliancerecordnavbarComponent),
    canActivate: [authGuard, roleGuard], data: { roles: ['COMPLIANCEOFFICER', 'AUDITOR']} 
  },
  { 
    path: 'compliance/audits', 
    loadComponent: () => import('./features/compliance/allaudits/allaudits').then(c => c.AllauditsComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['COMPLIANCEOFFICER', 'AUDITOR']} 
  },
  { 
    path: 'compliance/fill-record', 
    loadComponent: () => import('./features/compliance/compliancerecordform/compliancerecordform').then(c => c.CompliancerecordformComponent),
    canActivate: [authGuard, roleGuard], data: { roles: ['COMPLIANCEOFFICER', 'AUDITOR']} 
  },
  { 
    path: 'compliance/auditform', 
    loadComponent: () => import('./features/compliance/auditform/auditform').then(c => c.AuditformComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['COMPLIANCEOFFICER', 'AUDITOR']} 
  },

  // Farmer
  { 
    path: 'farmerdashboard', 
    loadComponent: () => import('./features/farmer/farmerdashboard/farmerdashboard').then(c => c.FarmerDashboardComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['FARMER']} 
  },
  { 
    path: 'farmer/documents', 
    loadComponent: () => import('./features/farmer/mydocuments/mydocuments').then(c => c.MyDocumentsComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['FARMER']} 
  },
  { 
    path: 'documents/upload', 
    loadComponent: () => import('./features/farmer/uploaddocuments/uploaddocuments').then(c => c.UploadDocumentsComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['FARMER']} 
  },
  { 
    path: 'farmer/training', 
    loadComponent: () => import('./features/farmer/trainingprograms/trainingprograms').then(c => c.TrainingComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['FARMER']} 
  },
  { 
    path: 'farmer/advisorycontent', 
    loadComponent: () => import('./features/farmer/advisorycontent/advisorycontent').then(c => c.AdvisoryContentComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['FARMER']} 
  },
  { 
    path: 'farmer/feedback', 
    loadComponent: () => import('./features/feedback/feedback').then(c => c.FeedbackComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['FARMER']} 
  },

  // Admin
  { 
    path: 'admindashboard', 
    loadComponent: () => import('./features/admin/admindashboard/admindashboard').then(c => c.AdminDashboardComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']} 
  },
  { 
    path: 'admin/users', 
    loadComponent: () => import('./features/admin/allusers/allusers').then(c => c.AllUsersComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']} 
  },
  { 
    path: 'admin/users/add', 
    loadComponent: () => import('./features/admin/adduserform/adduserform').then(c => c.AddUserFormComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']} 
  },
  { 
    path: 'admin/documents', 
    loadComponent: () => import('./features/admin/documentapproval/documentapproval').then(c => c.DocumentapprovalComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']} 
  },
  
  // Extension Officer
  { 
    path: 'officerdashboard', 
    loadComponent: () => import('./features/advisory/officerdashboard/officerdashboard').then(c => c.OfficerDashboardComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['EXTENSIONOFFICER']} 
  },
  { 
    path: 'officer/advisory/content', 
    loadComponent: () => import('./features/advisory/contentlibrary/contentlibrary').then(c => c.ContentLibraryComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['EXTENSIONOFFICER']} 
  },
  { 
    path: 'officer/advisory/session', 
    loadComponent: () => import('./features/advisory/sessionportal/sessionportal').then(c => c.SessionPortalComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['EXTENSIONOFFICER']} 
  },
  { 
    path: 'officer/attendance/:id', 
    loadComponent: () => import('./features/training/attendancedetails/attendancedetails').then(c => c.AttendancedetailsComponent),
    canActivate: [authGuard, roleGuard], data: { roles: ['EXTENSIONOFFICER']} 
  },

  // Program Manager
  { 
    path: 'managerdashboard', 
    loadComponent: () => import('./features/training/programmanagerdashboard/programmanagerdashboard').then(c => c.ProgrammanagerdashboardComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['PROGRAMMANAGER']} 
  },
  { 
    path: 'manager/programdetails/:id', 
    loadComponent: () => import('./features/training/programdetails/programdetails').then(c => c.ProgramdetailsComponent),
    canActivate: [authGuard, roleGuard], data: { roles: ['PROGRAMMANAGER']} 
  },
  { 
    path: 'manager/advisory/upload', 
    loadComponent: () => import('./features/advisory/uploadcontent/uploadcontent').then(c => c.ContentUploadComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['PROGRAMMANAGER']} 
  },
  { 
    path: 'manager/advisory/content', 
    loadComponent: () => import('./features/advisory/contentlibrary/contentlibrary').then(c => c.ContentLibraryComponent), 
    canActivate: [authGuard, roleGuard], data: { roles: ['PROGRAMMANAGER']} 
  }
];
