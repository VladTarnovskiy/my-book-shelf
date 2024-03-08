import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationComponent } from './verification.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('VerificationComponent', () => {
  let component: VerificationComponent;
  let fixture: ComponentFixture<VerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VerificationComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain message', () => {
    const messageEl: HTMLInputElement = fixture.nativeElement.querySelector(
      '.description__title'
    );
    expect(messageEl).toBeTruthy();
  });
});
