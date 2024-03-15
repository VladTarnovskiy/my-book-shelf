import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '@core/services/user';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ReviewItemComponent } from '.';

describe('ReviewItemComponent', () => {
  let component: ReviewItemComponent;
  let fixture: ComponentFixture<ReviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewItemComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUser: () => {
              return of();
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewItemComponent);
    component = fixture.componentInstance;
    component.reviewData = {
      review: 'Hello',
      bookId: 'wdec23e',
      userId: 'wedd234',
      id: 'wedcwed',
      creationDate: '2024',
    };
    component.userId = 'wedd234';
    component.username$.next('John');
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
