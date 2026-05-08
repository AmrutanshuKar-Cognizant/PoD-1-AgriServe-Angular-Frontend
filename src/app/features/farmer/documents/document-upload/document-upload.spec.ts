import { ComponentFixture, TestBed } from '@angular/core/testing';
// Update 1: Match the exported class name from your .ts file
import { DocumentUploadComponent } from './document-upload'; 

describe('DocumentUploadComponent', () => {
  let component: DocumentUploadComponent;
  let fixture: ComponentFixture<DocumentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Update 2: Import the correct class name
      imports: [DocumentUploadComponent], 
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentUploadComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});