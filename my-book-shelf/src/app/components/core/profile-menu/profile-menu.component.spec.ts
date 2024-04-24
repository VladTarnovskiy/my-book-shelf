import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileMenuComponent } from '.';

describe('ProfileMenuComponent', () => {
  let component: ProfileMenuComponent;
  let fixture: ComponentFixture<ProfileMenuComponent>;

  const initialState = {
    auth: {
      userName: 'Jake',
      userId: 'jake',
      photo: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileMenuComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        RouterTestingModule,
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain username', () => {
    const userNameEl: HTMLElement =
      fixture.nativeElement.querySelector('.profile__name');
    expect(userNameEl.textContent).toBe('Jake');
  });

  it('should contain menu profile item', () => {
    const profileItem: HTMLElement = fixture.nativeElement.querySelector(
      '.profile-menu__item'
    );
    expect(profileItem).toBeDefined();
  });
});
