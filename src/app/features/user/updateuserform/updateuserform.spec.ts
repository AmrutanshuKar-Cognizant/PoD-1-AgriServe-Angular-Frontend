import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateuserform } from './updateuserform';

describe('Updateuserform', () => {
  let component: Updateuserform;
  let fixture: ComponentFixture<Updateuserform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateuserform],
    }).compileComponents();

    fixture = TestBed.createComponent(Updateuserform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
