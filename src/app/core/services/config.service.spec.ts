import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { IConfig } from 'src/app/shared/models/config';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;
  const TEST_URL = './assets/config.json';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService],
    });

    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the config', fakeAsync(() => {
    const expectedConfig: IConfig = {
      apiUrl: 'https://www.googleapis.com/youtube/v3/',
      key: 'fakeKey',
      searchUrl: 'search',
      statisticUrl: 'videos',
      type: 'video',
      part: 'snippet',
      maxResults: 15,
      statisticPart: 'snippet,statistics',
    };

    service.getConfig().subscribe((data) => expect(expectedConfig).toBe(data));

    const req = httpMock.expectOne((request: HttpRequest<IConfig>): boolean => {
      expect(request.url).toEqual(TEST_URL);
      expect(request.method).toBe('GET');
      return true;
    });
    req.flush(expectedConfig);
    tick();
  }));

  it('should throw 404 error', () => {
    const emsg = 'deliberate 404 error';

    service.getConfig().subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(emsg);
      },
    });

    const req = httpMock.expectOne(TEST_URL);
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
