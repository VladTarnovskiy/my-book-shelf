import { TestBed } from '@angular/core/testing';
import { IToaster } from '@shared/models/toaster';

import { ToasterService } from '.';

describe('ToasterService', () => {
  let service: ToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add toaster', () => {
    const toastMock: IToaster = {
      message: 'test',
      title: 'test',
      type: 'success',
    };
    let res!: IToaster;
    service.toast$.subscribe((toast) => {
      res = toast;
    });
    service.show(toastMock);
    expect(res).toEqual(toastMock);
  });
});
