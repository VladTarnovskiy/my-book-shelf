import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoriteService } from '@core/services/favorite';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ApiBookReaderComponent } from '.';

describe('ApiBookReaderComponent', () => {
  let component: ApiBookReaderComponent;
  let fixture: ComponentFixture<ApiBookReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApiBookReaderComponent,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        provideMockStore(),
        {
          provide: FavoriteService,
          useValue: {
            getFavoriteBooks: () => {
              return of();
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiBookReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain back button', () => {
    const backButtonEl: HTMLElement =
      fixture.nativeElement.querySelector('.back');
    expect(backButtonEl).toBeDefined();
  });
});
