import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from './core/pages/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'my-book-shelf';
  ngOnInit() {
    alert(
      'Unfortunately, the Google books API is not available in Belarus, use a VPN to make the service work correctly!'
    );
  }
}
