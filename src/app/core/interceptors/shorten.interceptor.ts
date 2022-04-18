import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from 'src/app/shared/models/constants';

@Injectable()
export class ShortenInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!req.url.includes('config')) {
      req = req.clone({
        url: `${CONSTANTS.BASE_URL}${req.url}&key=${CONSTANTS.API_KEY}`,
      });
    }
    return next.handle(req);
  }
}
