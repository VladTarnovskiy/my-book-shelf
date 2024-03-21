import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PreviewSkeletonComponent } from '@components/preview/preview-skeleton';
import { ReviewComponent } from '@components/preview/review';
import { RecentService } from '@core/services/recent';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { PreviewComponent } from '.';

@Component({ standalone: true, selector: 'app-preview-skeleton', template: '' })
class PreviewSkeletonStubComponent {}

@Component({ standalone: true, selector: 'app-review', template: '' })
class ReviewStubComponent {}

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PreviewComponent,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        provideMockStore(),
        {
          provide: RecentService,
          useValue: {
            addRecentBook: () => {},
          },
        },
      ],
    })
      .overrideComponent(PreviewComponent, {
        add: {
          imports: [PreviewSkeletonComponent, ReviewComponent],
        },
        remove: {
          imports: [PreviewSkeletonStubComponent, ReviewStubComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PreviewComponent);
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
