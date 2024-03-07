import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';
import { UserService } from '../../services/user/user.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  const initialState = {
    auth: {
      userName: 'Jake',
      userId: 'jake',
      photo: null,
    },
  };

  class MockUserService {
    isLoggedIn = true;
    user = { name: 'Test User' };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState,
        }),
        { provide: UserService, useValue: MockUserService },
      ],
      imports: [ProfileComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change username', () => {
    const usernameInput: HTMLInputElement = fixture.nativeElement.querySelector(
      '.profile-item__input_username'
    );
    expect(usernameInput.value).toBe('Jake');
    usernameInput.value = 'Sam';
    usernameInput.dispatchEvent(new Event('input'));
    expect(component.userName.value).toBe('Sam');
  });
});
