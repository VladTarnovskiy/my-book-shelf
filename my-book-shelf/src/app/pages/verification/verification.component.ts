import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationComponent {}
