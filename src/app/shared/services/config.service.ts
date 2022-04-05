import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { take, tap, catchError } from 'rxjs/operators';
import { IConfig } from '../models/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public config: IConfig | undefined;
  private config$: Observable<IConfig>;

  constructor(private httpClient: HttpClient) {
    this.config$ = this.httpClient.get<IConfig>('./assets/config.json').pipe(
      take(1),
      tap((config) => (this.config = config)),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  public getConfig() {
    return this.config ? of(this.config) : this.config$;
  }
}
