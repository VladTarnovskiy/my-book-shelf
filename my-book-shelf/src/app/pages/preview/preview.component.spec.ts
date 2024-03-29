import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PreviewSkeletonComponent } from '@components/preview/preview-skeleton';
import { ReviewComponent } from '@components/preview/review';
import { RecentService } from '@core/services/recent';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SearchComponent } from '@pages/search';
import { bookDataStub } from '@shared/tests';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { of } from 'rxjs';

import { PreviewComponent } from '.';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home/:bookId', component: PreviewComponent },
  { path: 'search', component: SearchComponent },
];

@Component({ standalone: true, selector: 'app-preview-skeleton', template: '' })
class PreviewSkeletonStubComponent {}

@Component({ standalone: true, selector: 'app-review', template: '' })
class ReviewStubComponent {}

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PreviewComponent,
        RouterTestingModule.withRoutes(routes),
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        provideMockStore(),
        provideAngularSvgIcon(),
        {
          provide: RecentService,
          useValue: {
            addRecentBook: () => {},
          },
        },
      ],
    })
      .overrideComponent(PreviewComponent, {
        remove: {
          imports: [PreviewSkeletonComponent, ReviewComponent],
        },
        add: {
          imports: [PreviewSkeletonStubComponent, ReviewStubComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PreviewComponent);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    component.book$ = of(bookDataStub);
    router.navigate(['home/efvaefq']);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title', () => {
    const titleEl: HTMLElement = fixture.nativeElement.querySelector('.title');
    expect(titleEl).toBeDefined();
  });

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('get search route by clicking author', fakeAsync(() => {
    const authorEl: HTMLElement =
      fixture.nativeElement.querySelector('.author__name');
    authorEl.dispatchEvent(new Event('click'));
    tick();
    console.log(authorEl);
    expect(location.path()).toBe('/search');
  }));
});
