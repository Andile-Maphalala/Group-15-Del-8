import { TestBed } from '@angular/core/testing';

import { MyServiceServiceService } from './my-service-service.service';

describe('MyServiceServiceService', () => {
  let service: MyServiceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyServiceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
