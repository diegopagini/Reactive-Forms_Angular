import { TestBed } from '@angular/core/testing';

import { ValidadoresService } from './validadores.service';

describe('ValidadoresService', () => {
  let service: ValidadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
