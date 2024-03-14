import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewComponent } from './review.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReviewItemComponent } from '../review-item/review-item.component';
import { Component } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { ReviewService } from '../../../core/services/review/review.service';
import { of } from 'rxjs';

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
