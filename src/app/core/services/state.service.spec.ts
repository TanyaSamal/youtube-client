import { TestBed } from '@angular/core/testing';
import { StateService } from './state.service';

describe('StateService', () => {
  let service: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateService],
    });
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('updatedDataSelection should change data value in true', () => {
    service.updatedDataSelection(true);
    service.data$.subscribe((data) => {
      expect(data).toBeTrue();
    });
  });

  it('updatedDataSelection should change data value in false', () => {
    service.updatedDataSelection(false);
    service.data$.subscribe((data) => {
      expect(data).toBeFalse();
    });
  });
});
