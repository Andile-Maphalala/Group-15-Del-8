import { TestBed } from '@angular/core/testing';

import { PayfeeService } from './payfee.service';

describe('PayfeeService', () => {
  let service: PayfeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayfeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
