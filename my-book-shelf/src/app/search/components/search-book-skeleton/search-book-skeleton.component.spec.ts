import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookSkeletonComponent } from './search-book-skeleton.component';

describe('SearchBookSkeletonComponent', () => {
  let component: SearchBookSkeletonComponent;
  let fixture: ComponentFixture<SearchBookSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBookSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBookSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
