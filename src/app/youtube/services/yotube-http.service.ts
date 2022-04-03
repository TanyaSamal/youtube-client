import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IConfigParams } from 'src/app/shared/models/config';
import { ConfigService } from 'src/app/shared/services/config.service';
import { ISearchResponse } from '../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeHttpService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  private joinParams(params: IConfigParams): string {
    let queryArr: Array<String> = [];
    for (const [key, value] of Object.entries(params)) {
      queryArr.push(`${key}=${value}`);
    }
    return queryArr.join('&');
  }

  getVideos(query: string): Observable<ISearchResponse> {
    return this.configService.getConfig().pipe(
      switchMap((config) => {
        const videoParams = {
          type: config.type,
          part: config.part,
          maxResults: config.maxResults,
          q: query,
        };
        const queryVideo = this.joinParams(videoParams);
        return this.http.get<ISearchResponse>(`${config.searchUrl}?${queryVideo}`);
      }),
    );
  }

  getStatistic(idStr: string): Observable<ISearchResponse> {
    return this.configService.getConfig().pipe(
      switchMap((config) => {
        const statParams = {
          id: idStr,
          part: config.statisticPart,
        };
        const queryStat = this.joinParams(statParams);
        return this.http.get<ISearchResponse>(`${config.statisticUrl}?${queryStat}`);
      }),
    );
  }
}
