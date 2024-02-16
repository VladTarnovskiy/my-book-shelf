import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToasterContainerComponent } from './core/components/toaster-container/toaster-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToasterContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    alert(
      'The Google books API is not available in Belarus, please, use a VPN to make the service work correctly!'
    );
  }
}
