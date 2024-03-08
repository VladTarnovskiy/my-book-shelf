import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent {}
