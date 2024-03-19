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
    expect(component.theme$.getValue()).toBe('light');
    const switchEl: HTMLElement = fixture.nativeElement.querySelector(
      '.switcher__container'
    );
    switchEl.dispatchEvent(new Event('click'));
    expect(component.theme$.getValue()).toBe('dark');
  });
});
