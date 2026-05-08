import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Documentdashboard } from './documentdashboard';

describe('Documentdashboard', () => {
  let component: Documentdashboard;
  let fixture: ComponentFixture<Documentdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Documentdashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Documentdashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
