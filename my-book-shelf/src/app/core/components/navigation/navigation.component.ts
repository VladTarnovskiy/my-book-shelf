import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

const navigationList = [
  { link: '/', icon: 'assets/navigation/home.svg', title: 'Home' },
  { link: '/search', icon: 'assets/navigation/search.svg', title: 'Search' },
  {
    link: '/favorite',
    icon: 'assets/navigation/bookshelf.svg',
    title: 'Favorite',
  },
  { link: '/', icon: 'assets/navigation/bookshelf.svg', title: 'My Books' },
  { link: '/upload', icon: 'assets/navigation/give-gift.svg', title: 'Upload' },
];

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  navigationList = navigationList;
}
