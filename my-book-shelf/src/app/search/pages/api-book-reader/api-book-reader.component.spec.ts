import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiBookReaderComponent } from './api-book-reader.component';

describe('ApiBookReaderComponent', () => {
  let component: ApiBookReaderComponent;
  let fixture: ComponentFixture<ApiBookReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiBookReaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiBookReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
