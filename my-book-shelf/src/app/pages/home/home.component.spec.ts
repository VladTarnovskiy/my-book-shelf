import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeBookComponent } from '@components/home/home-book';
import { HomeBookSkeletonComponent } from '@components/home/home-book-skeleton';
import { QuoteComponent } from '@components/home/quote';
import { RecentService } from '@core/services/recent';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { HomeComponent } from '.';

@Component({ standalone: true, selector: 'app-quote', template: '' })
class QuoteStubComponent {}

@Component({ standalone: true, selector: 'app-home-book', template: '' })
class HomeBookStubComponent {}

@Component({
  standalone: true,
  selector: 'app-home-book-skeleton',
  template: '',
})
class HomeBookSkeletonStubComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot(), RouterTestingModule],
      providers: [
        provideMockStore(),
        {
          provide: RecentService,
          useValue: {
            getRecentBooks: () => {
              return of();
            },
          },
        },
      ],
    })
      .overrideComponent(HomeComponent, {
        add: {
          imports: [
            QuoteStubComponent,
            HomeBookStubComponent,
            HomeBookSkeletonStubComponent,
          ],
        },
        remove: {
          imports: [
            QuoteComponent,
            HomeBookComponent,
            HomeBookSkeletonComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain greeting', () => {
    const greetingEl: HTMLElement =
      fixture.nativeElement.querySelector('.greeting');
    expect(greetingEl).toBeDefined();
  });
});
