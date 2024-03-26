import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBookSkeletonComponent } from '.';

describe('HomeBookSkeletonComponent', () => {
  let component: HomeBookSkeletonComponent;
  let fixture: ComponentFixture<HomeBookSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBookSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeBookSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
