import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@core/services/auth';
import { UserService } from '@core/services/user';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot(), RouterTestingModule],
      providers: [
        provideMockStore(),
        {
          provide: AuthService,
          useValue: {
            getUserAfterReload: () => {},
          },
        },
        {
          provide: Auth,
          useValue: {
            onAuthStateChanged: () => of(),
          },
        },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
