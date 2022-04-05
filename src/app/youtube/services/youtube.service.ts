import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, switchMap, throwError } from 'rxjs';
import { ISearchResponse } from '../models/search.model';
import { YoutubeHttpService } from './yotube-http.service';

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  public data$: Observable<ISearchResponse>;
  private response$ = new Subject<ISearchResponse>();

  constructor(private youtubeHttp: YoutubeHttpService) {
    this.data$ = this.response$.asObservable();
  }

  public getResponse(query: string): Observable<ISearchResponse> {
    return this.youtubeHttp.getVideos(query).pipe(
      switchMap((videoResponse) => {
        let idStr = '';
        videoResponse.items.forEach((item) => {
          idStr += `${typeof item.id === 'string' ? item.id : item.id.videoId},`;
        });
        return this.youtubeHttp.getStatistic(idStr);
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
