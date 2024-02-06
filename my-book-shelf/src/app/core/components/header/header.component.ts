import { SettingsComponent } from '../settings/settings.component';
import { SearchBarComponent } from './../search-bar/search-bar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent, SettingsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
