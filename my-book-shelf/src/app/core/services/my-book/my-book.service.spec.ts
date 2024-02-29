import { TestBed } from '@angular/core/testing';

import { MyBookService } from './my-book.service';

describe('MyBookService', () => {
  let service: MyBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
