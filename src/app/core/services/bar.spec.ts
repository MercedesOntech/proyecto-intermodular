import { TestBed } from '@angular/core/testing';

import { Bar } from './bar';

describe('Bar', () => {
  let service: Bar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
