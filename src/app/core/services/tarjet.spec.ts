import { TestBed } from '@angular/core/testing';

import { Tarjet } from './tarjet';

describe('Tarjet', () => {
  let service: Tarjet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tarjet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
