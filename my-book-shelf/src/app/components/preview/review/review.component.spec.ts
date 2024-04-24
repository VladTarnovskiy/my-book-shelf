import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewService } from '@core/services/review';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ReviewItemComponent } from '../review-item';
import { ReviewComponent } from '.';

@Component({ standalone: true, selector: 'app-review-item', template: '' })
class ReviewItemStubComponent {}

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  const initialState = {
    auth: {
      userName: 'Jake',
      userId: 'jake',
      photo: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewComponent, TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          initialState,
        }),
        {
          provide: ReviewService,
          useValue: {
            getReviews: () => {
              return of();
            },
          },
        },
      ],
    })
      .overrideComponent(ReviewComponent, {
        add: {
          imports: [ReviewItemStubComponent],
        },
        remove: {
          imports: [ReviewItemComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title', () => {
    const titleEl: HTMLElement = fixture.nativeElement.querySelector('.title');
    expect(titleEl).toBeDefined();
  });
});
