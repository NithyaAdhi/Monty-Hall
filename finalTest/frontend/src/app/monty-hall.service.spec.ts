import { TestBed } from '@angular/core/testing';

import { MontyHallService } from './monty-hall.service';

describe('MontyHallService', () => {
  let service: MontyHallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MontyHallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
