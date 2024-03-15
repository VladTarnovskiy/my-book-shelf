import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { PreviewOptionsComponent } from '.';

describe('PreviewOptionsComponent', () => {
  let component: PreviewOptionsComponent;
  let fixture: ComponentFixture<PreviewOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewOptionsComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
