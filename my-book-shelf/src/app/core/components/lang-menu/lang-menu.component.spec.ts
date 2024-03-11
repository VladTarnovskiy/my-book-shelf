import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LangMenuComponent } from './lang-menu.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LangMenuComponent', () => {
  let component: LangMenuComponent;
  let fixture: ComponentFixture<LangMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangMenuComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(LangMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch lang', () => {
    const switchEnElement: HTMLElement =
      fixture.nativeElement.querySelectorAll('.lang-menu__item')[0];
    switchEnElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.activeLang.getValue()).toBe('en');
    const switchRuElement: HTMLElement =
      fixture.nativeElement.querySelectorAll('.lang-menu__item')[1];
    switchRuElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.activeLang.getValue()).toBe('ru');
  });
});
