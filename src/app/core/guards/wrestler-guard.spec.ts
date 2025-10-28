import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { wrestlerGuard } from './wrestler-guard';

describe('wrestlerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => wrestlerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
