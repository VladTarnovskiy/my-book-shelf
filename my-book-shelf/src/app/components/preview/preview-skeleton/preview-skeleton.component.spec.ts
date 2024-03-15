import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSkeletonComponent } from '.';

describe('PreviewSkeletonComponent', () => {
  let component: PreviewSkeletonComponent;
  let fixture: ComponentFixture<PreviewSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
