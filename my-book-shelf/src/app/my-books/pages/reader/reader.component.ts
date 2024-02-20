import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MyBooksFacade } from '../../../store/my-books/my-books.facade';
import { Observable, takeUntil } from 'rxjs';
import { IUploadBook } from '../../models/upload';
import { DestroyDirective } from '../../../core/directives/destroy/destroy.directive';
import { SafePipe } from '../../../core/pipes/safe/safe.pipe';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss',
  hostDirectives: [DestroyDirective],
})
export class ReaderComponent implements OnInit {
  book$: Observable<IUploadBook | null> = this.myBooksFacade.selectedBook$;
  book: IUploadBook | null = null;
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(private myBooksFacade: MyBooksFacade) {}

  ngOnInit(): void {
    this.book$
      .pipe(takeUntil(this.destroy$))
      .subscribe((book) => (this.book = book));
  }
}
