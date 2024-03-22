import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILikeInfo } from '@shared/models/review';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-likes-info',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './likes-info.component.html',
  styleUrl: './likes-info.component.scss',
})
export clss LikesInfoComponent {
  @Input({ required: true }) likes!: ILikeInfo[];
  @Output() toggleLikesInfo = new EventEmitter();

  emitToggleLikesInfo(): void {
    this.toggleLikesInfo.emit();
  }
}
