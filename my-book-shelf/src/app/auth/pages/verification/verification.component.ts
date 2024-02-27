import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
})
export class VerificationComponent implements OnInit {
  constructor(private auth: Auth) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged(
      (x) => {
        console.log(x?.emailVerified);
      },
      () => {
        console.log('error');
      },
      () => {
        console.log('complete');
      }
    );
  }
}
