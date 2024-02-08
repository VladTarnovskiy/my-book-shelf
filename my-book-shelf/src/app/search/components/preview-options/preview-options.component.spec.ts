import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewOptionsComponent } from './preview-options.component';

describe('PreviewOptionsComponent', () => {
  let component: PreviewOptionsComponent;
  let fixture: ComponentFixture<PreviewOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
