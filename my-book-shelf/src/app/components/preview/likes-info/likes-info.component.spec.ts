import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesInfoComponent } from './likes-info.component';

describe('LikesInfoComponent', () => {
  let component: LikesInfoComponent;
  let fixture: ComponentFixture<LikesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikesInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
