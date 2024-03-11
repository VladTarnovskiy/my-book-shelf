import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteUploadBookComponent } from './favorite-upload-book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { myBookStub } from '../../../shared/tests/bookStub';

describe('FavoriteUploadBookComponent', () => {
  let component: FavoriteUploadBookComponent;
  let fixture: ComponentFixture<FavoriteUploadBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FavoriteUploadBookComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteUploadBookComponent);
    component = fixture.componentInstance;
    component.uploadBookData = myBookStub;
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
