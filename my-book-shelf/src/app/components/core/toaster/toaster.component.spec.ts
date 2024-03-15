import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ToasterComponent } from '.';

describe('ToasterComponent', () => {
  let component: ToasterComponent;
  let fixture: ComponentFixture<ToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToasterComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ToasterComponent);
    component = fixture.componentInstance;
    component.toast = {
      type: 'success',
      title: 'Hello',
      message: 'World',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Contain message', () => {
    const titleEl: HTMLElement =
      fixture.nativeElement.querySelector('.toast-heading');
    const messageEl: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(titleEl.textContent).toBe('Hello');
    expect(messageEl.textContent).toBe('World');
  });
});
