import { Injectable } from '@angular/core';
import { ISearchResponse } from '../models/search.model';

@Injectable()
export class YoutubeService {
  private responseUrl = '../../../assets/responce.json';

  async getResponse(): Promise<ISearchResponse> {
    const res = await fetch(this.responseUrl);
    return res.json();
  }
}
