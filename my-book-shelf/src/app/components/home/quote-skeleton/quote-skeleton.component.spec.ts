import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteSkeletonComponent } from '.';

describe('QuoteSkeletonComponent', () => {
  let component: QuoteSkeletonComponent;
  let fixture: ComponentFixture<QuoteSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
