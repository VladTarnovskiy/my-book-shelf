import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';
import { Component } from '@angular/core';
import { HomeBookSkeletonComponent } from '../../components/home/home-book-skeleton/home-book-skeleton.component';
import { HomeBookComponent } from '../../components/home/home-book/home-book.component';
import { QuoteComponent } from '../../components/home/quote/quote.component';
import { RecentService } from '../../core/services/recent/recent.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

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
