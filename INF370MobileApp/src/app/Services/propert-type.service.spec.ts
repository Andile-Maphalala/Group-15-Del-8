import { TestBed } from '@angular/core/testing';

import { PropertTypeService } from './propert-type.service';

describe('PropertTypeService', () => {
  let service: PropertTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
