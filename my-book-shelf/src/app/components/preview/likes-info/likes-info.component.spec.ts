import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { likesStub } from '@shared/tests';
import { provideAngularSvgIcon } from 'angular-svg-icon';

import { LikesInfoComponent } from './likes-info.component';

describe('LikesInfoComponent', () => {
  let component: LikesInfoComponent;
  let fixture: ComponentFixture<LikesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikesInfoComponent, HttpClientTestingModule],
      providers: [provideAngularSvgIcon()],
    }).compileComponents();

    fixture = TestBed.createComponent(LikesInfoComponent);
    component = fixture.componentInstance;
    component.likes = likesStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain two likes', () => {
    const likesInfo: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('.likes-info-item');

    expect(likesInfo.length).toBe(2);
  });
});
