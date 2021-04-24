import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtListCardComponent } from './debt-list-card.component';

describe('DebtListCardComponent', () => {
  let component: DebtListCardComponent;
  let fixture: ComponentFixture<DebtListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
