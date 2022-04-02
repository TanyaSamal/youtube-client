import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { ISearchCard } from '../models/search-card.model';
import { ISearchResponse } from '../models/search.model';
import { YoutubeHttpService } from './yotube-http.service';

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  public data$: Observable<ISearchResponse>;
  private response$ = new Subject<ISearchResponse>();
  private response: ISearchResponse = Object.assign({});

  constructor(private youtubeHttp: YoutubeHttpService) {
    this.data$ = this.response$.asObservable();
  }

  getResponse(query: string) {
    this.youtubeHttp
      .getVideos(query)
      .pipe(
        switchMap((videoResponse) => {
          let idStr = '';
          videoResponse.items.forEach((item) => {
            idStr += `${typeof item.id === 'string' ? item.id : item.id.videoId},`;
          });
          return this.youtubeHttp.getStatistic(idStr);
        }),
      )
      .subscribe((statResponse) => {
        this.response$.next(statResponse);
        this.response = statResponse;
      });
  }

  getVideoById(id: string): ISearchCard {
    const card = this.response.items.find((elem) => elem.id === id);
    return card ? card : Object.assign({});
  }
}
