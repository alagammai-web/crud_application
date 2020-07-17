import { TestBed } from '@angular/core/testing';

import { InterGuard } from './inter.guard';

describe('InterGuard', () => {
  let guard: InterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
