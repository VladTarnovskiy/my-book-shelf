import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/core/footer';
import { LangMenuComponent } from '@components/core/lang-menu';
import { NavigationComponent } from '@components/core/navigation';
import { ProfileMenuComponent } from '@components/core/profile-menu';
import { SearchBarComponent } from '@components/core/search-bar';

import { LayoutComponent } from '.';

@Component({ standalone: true, selector: 'app-navigation', template: '' })
class NavigationStubComponent {}

@Component({ standalone: true, selector: 'app-footer', template: '' })
class FooterStubComponent {}

@Component({ standalone: true, selector: 'app-search-bar', template: '' })
class SearchBarStubComponent {}

@Component({ standalone: true, selector: 'app-lang-menu', template: '' })
class LangMenuStubComponent {}

@Component({ standalone: true, selector: 'app-profile-menu', template: '' })
class ProfileMenuStubComponent {}

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ standalone: true, selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(() => {
    TestBed.overrideComponent(LayoutComponent, {
      add: {
        imports: [
          NavigationStubComponent,
          FooterStubComponent,
          SearchBarStubComponent,
          LangMenuStubComponent,
          ProfileMenuStubComponent,
          RouterOutletStubComponent,
        ],
      },
      remove: {
        imports: [
          RouterOutlet,
          NavigationComponent,
          FooterComponent,
          SearchBarComponent,
          LangMenuComponent,
          ProfileMenuComponent,
        ],
      },
    });
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hamburger but toggle', () => {
    expect(component.isActiveHamburger).toBeFalsy();
    const hamburgerButton: HTMLElement =
      fixture.nativeElement.querySelector('.hamburger');
    hamburgerButton.click();
    expect(component.isActiveHamburger).toBeTruthy();
  });
});
