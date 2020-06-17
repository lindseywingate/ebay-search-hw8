import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceValidationComponent } from './price-validation.component';

describe('PriceValidationComponent', () => {
  let component: PriceValidationComponent;
  let fixture: ComponentFixture<PriceValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
