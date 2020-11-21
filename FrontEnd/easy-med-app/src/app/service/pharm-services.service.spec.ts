import { TestBed } from '@angular/core/testing';

import { PharmServicesService } from './pharm-services.service';

describe('PharmServicesService', () => {
  let service: PharmServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
