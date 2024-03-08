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
    expect(component.activeLang).toBe('en');
    const switchElement: HTMLElement =
      fixture.nativeElement.querySelectorAll('.lang-menu__item')[1];
    switchElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.activeLang).toBe('ru');
  });
});
