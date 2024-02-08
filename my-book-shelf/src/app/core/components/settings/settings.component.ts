import { Component } from '@angular/core';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { LangMenuComponent } from '../lang-menu/lang-menu.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ProfileMenuComponent, LangMenuComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
