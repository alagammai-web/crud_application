import { TestBed } from '@angular/core/testing';

import { InterfaceGuard } from './interface.guard';

describe('InterfaceGuard', () => {
  let guard: InterfaceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InterfaceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
