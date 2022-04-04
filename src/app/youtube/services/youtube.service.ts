import { Injectable } from '@angular/core';
import { ISearchResponse } from '../models/search.model';

@Injectable({ providedIn: 'any' })
export class YoutubeService {
  public response: ISearchResponse = Object.assign({});
  private responseUrl = '../../../assets/responce.json';

  public async getResponse() {
    const res = await fetch(this.responseUrl);
    this.response = await res.json();
  }
}
