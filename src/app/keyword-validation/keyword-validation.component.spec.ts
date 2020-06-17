import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordValidationComponent } from './keyword-validation.component';

describe('KeywordValidationComponent', () => {
  let component: KeywordValidationComponent;
  let fixture: ComponentFixture<KeywordValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
