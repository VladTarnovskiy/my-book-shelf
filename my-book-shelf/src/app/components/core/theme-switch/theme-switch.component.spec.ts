import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSwitchComponent } from '.';

describe('ThemeSwitchComponent', () => {
  let component: ThemeSwitchComponent;
  let fixture: ComponentFixture<ThemeSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch theme', () => {
    const theme = component.theme$.getValue();
    const switchEl: HTMLElement = fixture.nativeElement.querySelector(
      '.switcher__container'
    );
    switchEl.click();
    expect(component.theme$.getValue()).toBe(
      theme === 'light' ? 'dark' : 'light'
    );
  });
});
