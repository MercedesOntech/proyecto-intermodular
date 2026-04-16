import { TestBed } from '@angular/core/testing';

import { FilmTicket } from './film-ticket';

describe('FilmTicket', () => {
  let service: FilmTicket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmTicket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
