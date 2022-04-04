import { Injectable } from '@angular/core';
import { ISearchResponse } from '../models/search.model';

@Injectable({ providedIn: 'any' })
export class YoutubeService {
  private responseUrl = '../../../assets/responce.json';
  response: ISearchResponse = Object.assign({});

  async getResponse() {
    const res = await fetch(this.responseUrl);
    this.response = await res.json();
  }
}
