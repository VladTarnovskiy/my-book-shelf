import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteUploadBookComponent } from './favorite-upload-book.component';

describe('FavoriteUploadBookComponent', () => {
  let component: FavoriteUploadBookComponent;
  let fixture: ComponentFixture<FavoriteUploadBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteUploadBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteUploadBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
