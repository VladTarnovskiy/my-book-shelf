import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewComponent } from './preview.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';
import { RecentService } from '../../../core/services/recent/recent.service';
import { PreviewOptionsComponent } from '../../components/preview-options/preview-options.component';
import { Component } from '@angular/core';
import { PreviewSkeletonComponent } from '../../components/preview-skeleton/preview-skeleton.component';
import { ReviewComponent } from '../../components/review/review.component';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ standalone: true, selector: 'app-preview-skeleton', template: '' })
class PreviewSkeletonStubComponent {}

@Component({ standalone: true, selector: 'app-preview-options', template: '' })
class PreviewOptionsStubComponent {}

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
          imports: [
            PreviewSkeletonComponent,
            PreviewOptionsComponent,
            ReviewComponent,
          ],
        },
        remove: {
          imports: [
            PreviewSkeletonStubComponent,
            PreviewOptionsStubComponent,
            ReviewStubComponent,
          ],
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
