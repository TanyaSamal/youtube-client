import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ConfigService } from 'src/app/core/services/config.service';
import { ProgressService } from '../services/progress.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private progressService: ProgressService, private configService: ConfigService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.configService.config) {
      return next.handle(request);
    }
    if (
      request.url.includes(this.configService.config.searchUrl) ||
      request.url.includes(this.configService.config.statisticUrl)
    ) {
      this.progressService.show();
      return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.progressService.hide();
          }
        }),
        catchError((error) => {
          this.progressService.hide();
          return throwError(() => error);
        }),
      );
    }
    return next.handle(request);
  }
}
