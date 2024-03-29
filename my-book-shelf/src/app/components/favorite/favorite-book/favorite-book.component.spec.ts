import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { favoriteBookDataStub } from '@shared/tests';

import { FavoriteBookComponent } from '.';

describe('FavoriteBookComponent', () => {
  let component: FavoriteBookComponent;
  let fixture: ComponentFixture<FavoriteBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FavoriteBookComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteBookComponent);
    component = fixture.componentInstance;
    component.bookData = favoriteBookDataStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain input data', () => {
    const titleEl: HTMLElement = fixture.nativeElement.querySelector('.title');
    expect(titleEl.textContent).toBe('Brandsmoor');
  });
});
