import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewService } from '@core/services/review';
import { UserService } from '@core/services/user';
import { TranslateModule } from '@ngx-translate/core';
import { reviewStub } from '@shared/tests';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { of } from 'rxjs';

import { ReviewItemComponent } from '.';

describe('ReviewItemComponent', () => {
  let component: ReviewItemComponent;
  let fixture: ComponentFixture<ReviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReviewItemComponent,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        provideAngularSvgIcon(),
        {
          provide: UserService,
          useValue: {
            getUser: () => {
              return of();
            },
          },
        },
        {
          provide: ReviewService,
          useValue: {
            toggleLike: () => {
              return of();
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewItemComponent);
    component = fixture.componentInstance;
    component.reviewData = reviewStub;
    component.currentUserData = {
      username: 'Jake',
      userPhoto: 'photo',
      userId: 'wedd234',
    };
    component.reviewUsername$.next('John');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain info', () => {
    const usernameEl: HTMLElement =
      fixture.nativeElement.querySelector('.username');
    const reviewEl: HTMLElement = fixture.nativeElement.querySelector(
      '.review-item__content'
    );
    expect(reviewEl.textContent).toBe(' Hello ');
    expect(usernameEl.textContent).toBe('John');
  });

  it('should open remove modal', () => {
    const closeButEl: HTMLElement = fixture.nativeElement.querySelector(
      '.review-item__remove'
    );
    expect(fixture.nativeElement.querySelector('.modal-content')).toBeFalsy();
    expect(component.isRemoveModal).toBe(false);
    closeButEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal-content')).toBeTruthy();
    expect(component.isRemoveModal).toBe(true);
  });
});
