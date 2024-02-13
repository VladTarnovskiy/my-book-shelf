import { ChangeDetectionStrategy, Component } from '@angular/core';

const footerData = [
  { href: '#', title: 'About' },
  { href: '#', title: 'Support' },
  { href: '#', title: 'Terms & Condition' },
];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  footerData = footerData;
}
