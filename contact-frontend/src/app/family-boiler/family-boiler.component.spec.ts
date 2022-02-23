import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyBoilerComponent } from './family-boiler.component';

describe('FamilyBoilerComponent', () => {
  let component: FamilyBoilerComponent;
  let fixture: ComponentFixture<FamilyBoilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyBoilerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyBoilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
