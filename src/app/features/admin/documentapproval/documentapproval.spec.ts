import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Documentapproval } from './documentapproval';

describe('Documentapproval', () => {
  let component: Documentapproval;
  let fixture: ComponentFixture<Documentapproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Documentapproval],
    }).compileComponents();

    fixture = TestBed.createComponent(Documentapproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
