/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeadlineService } from './deadline.service';

describe('Service: Deadline', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeadlineService]
    });
  });

  it('should ...', inject([DeadlineService], (service: DeadlineService) => {
    expect(service).toBeTruthy();
  }));
});
