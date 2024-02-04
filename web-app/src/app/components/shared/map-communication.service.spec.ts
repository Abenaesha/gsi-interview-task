import { TestBed } from '@angular/core/testing';

import { MapCommunicationService } from './map-communication.service';

describe('MapCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapCommunicationService = TestBed.get(MapCommunicationService);
    expect(service).toBeTruthy();
  });
});
