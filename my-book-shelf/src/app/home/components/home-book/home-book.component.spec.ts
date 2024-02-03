import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBookComponent } from './home-book.component';

describe('HomeBookComponent', () => {
  let component: HomeBookComponent;
  let fixture: ComponentFixture<HomeBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBookComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
