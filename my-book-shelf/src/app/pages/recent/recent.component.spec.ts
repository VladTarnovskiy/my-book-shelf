import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentService } from '@core/services/recent';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { RecentComponent } from '.';

describe('RecentComponent', () => {
  let component: RecentComponent;
  let fixture: ComponentFixture<RecentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: RecentService,
          useValue: {
            getRecentBooks: () => {
              return of();
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentComponent);
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
