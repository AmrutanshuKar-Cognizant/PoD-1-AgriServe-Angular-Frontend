import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplianceService } from '../../../core/services/compliance/compliance';

@Component({
  selector: 'app-compliancerecordform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- Must import ReactiveFormsModule
  templateUrl: './compliancerecordform.html'
})
export class CompliancerecordformComponent implements OnInit {
  recordForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private complianceService: ComplianceService
  ) {}

  ngOnInit(): void {
    // 1. Grab the parameters from the URL
    const entityId = this.route.snapshot.queryParamMap.get('entityId');
    const type = this.route.snapshot.queryParamMap.get('type');

    // 2. Initialize the Reactive Form
    this.recordForm = this.fb.group({
      // Disabled fields prevent the user from editing them
      entityId: [{ value: entityId, disabled: true }, Validators.required],
      type: [{ value: type, disabled: true }, Validators.required],
      
      // Editable fields with strict validation matching your backend
      result: ['', Validators.required],
      notes: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onSubmit(): void {
    if (this.recordForm.invalid) {
      this.recordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const payload = this.recordForm.getRawValue(); // gets all fields, including disabled ones

    // REAL BACKEND CALL
    this.complianceService.submitRecord(payload).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        alert('Compliance Record successfully saved to the database!');
        this.router.navigate(['/compliance/records']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Error saving record:', err);
        alert('Failed to save the record. Please check the console.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/compliance/records']);
  }
}