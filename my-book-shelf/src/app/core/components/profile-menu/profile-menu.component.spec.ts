import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileMenuComponent } from './profile-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

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
      imports: [ProfileMenuComponent, TranslateModule.forRoot()],
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
      fixture.nativeElement.querySelector('.profile__title');
    expect(userNameEl.textContent).toBe('Jake');
  });

  it('should contain menu profile item', () => {
    const profileItem: HTMLElement = fixture.nativeElement.querySelector(
      '.profile-menu__item'
    );
    expect(profileItem).toBeDefined();
  });
});
