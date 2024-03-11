import { TestBed } from '@angular/core/testing';
import { ToasterService } from './toaster.service';
import { Toaster } from '../../models/toaster';

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
    const toastMock: Toaster = {
      message: 'test',
      title: 'test',
      type: 'success',
    };
    let res!: Toaster;
    service.toast$.subscribe((toast) => {
      res = toast;
    });
    service.show(toastMock);
    expect(res).toEqual(toastMock);
  });
});
